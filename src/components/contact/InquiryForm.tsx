'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/context/LanguageContext';
import { FiSend, FiCheck, FiAlertCircle, FiMessageCircle } from 'react-icons/fi';
import { FAMILIES, SITE, WHATSAPP_URL } from '@/lib/site';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  product: string;
  message: string;
}

interface InquiryFormProps {
  productSlug?: string;
  productName?: string;
}

const InquiryForm: React.FC<InquiryFormProps> = ({ productSlug, productName }) => {
  const { t, locale } = useLanguage();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [draft, setDraft] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      product: productName ? 'other' : '',
      message: productName ? `${t.contact.message}: ${productName}` : '',
    },
  });

  // A product link on /products or a product page carries ?product=<slug>.
  // Reflect it in the form heading instead of silently dropping it.
  const [fromUrl, setFromUrl] = useState('');
  useEffect(() => {
    if (productName) {
      setFromUrl(productName);
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const reference = params.get('product');
    if (reference) setFromUrl(reference.replace(/[-_]+/g, ' ').trim());
  }, [productName]);

  // Fallback used only when the server could not send the inquiry.
  const buildMailto = (data: FormData) => {
    const reference = productName || fromUrl || data.product || '';
    const subject = `Film inquiry${reference ? ` — ${reference}` : ''}`;
    const bodyLines = [
      `${t.contact.name}: ${data.name}`,
      `${t.contact.email}: ${data.email}`,
      data.phone ? `${t.contact.phone}: ${data.phone}` : '',
      data.company ? `${t.contact.company}: ${data.company}` : '',
      data.country ? `${t.contact.country}: ${data.country}` : '',
      reference ? `${t.contact.product}: ${reference}` : '',
      '',
      data.message,
      '',
      `— Sent from ${SITE.url}`,
    ].filter(Boolean);

    return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines.join('\n'),
    )}`;
  };

  // The server sends the notification email (and keeps a copy in D1); the
  // visitor's own mail client is only the fallback when that fails.
  const onSubmit = async (data: FormData) => {
    setSubmitStatus('sending');
    setErrorMessage('');
    setDraft(data);

    const reference = productName || fromUrl || data.product || '';
    const page =
      typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}` : '';

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          company: data.company || '',
          country: data.country || '',
          product: reference,
          message: data.message,
          page,
        }),
      });

      const payload: any = await response.json().catch(() => ({}));

      if (response.ok && payload?.success) {
        setSubmitStatus('success');
        reset({ product: '', message: '' });
        return;
      }

      setErrorMessage(typeof payload?.error === 'string' ? payload.error : '');
      setSubmitStatus('error');
    } catch {
      setSubmitStatus('error');
    }
  };

  const whatsappText = encodeURIComponent(
    `Hello ${SITE.name}, I would like a quotation.` +
      (productName || fromUrl ? ` Product: ${productName || fromUrl}.` : ''),
  );

  const fieldClass =
    'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100';
  const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700';
  const errorClass = 'mt-1 flex items-center gap-1 text-sm text-red-600';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-xl font-bold text-slate-900">{t.contact.formTitle}</h2>
      <p className="mt-1.5 text-sm text-slate-600">{t.contact.formSubtitle}</p>
      {fromUrl && (
        <p className="mt-3 inline-flex rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-800">
          {t.contact.product}: {fromUrl}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="inq-name">
              {t.contact.name} *
            </label>
            <input
              id="inq-name"
              type="text"
              autoComplete="name"
              className={fieldClass}
              {...register('name', { required: true })}
            />
            {errors.name && (
              <p className={errorClass}>
                <FiAlertCircle className="h-4 w-4" aria-hidden /> {t.contact.name}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} htmlFor="inq-email">
              {t.contact.email} *
            </label>
            <input
              id="inq-email"
              type="email"
              autoComplete="email"
              className={fieldClass}
              {...register('email', {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            {errors.email && (
              <p className={errorClass}>
                <FiAlertCircle className="h-4 w-4" aria-hidden /> {t.contact.email}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} htmlFor="inq-phone">
              {t.contact.phone}
            </label>
            <input id="inq-phone" type="tel" autoComplete="tel" className={fieldClass} {...register('phone')} />
          </div>

          <div>
            <label className={labelClass} htmlFor="inq-company">
              {t.contact.company}
            </label>
            <input
              id="inq-company"
              type="text"
              autoComplete="organization"
              className={fieldClass}
              {...register('company')}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="inq-country">
              {t.contact.country}
            </label>
            <input
              id="inq-country"
              type="text"
              autoComplete="country-name"
              className={fieldClass}
              {...register('country')}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="inq-product">
              {t.contact.product}
            </label>
            <select id="inq-product" className={fieldClass} {...register('product')}>
              <option value="">{t.contact.productPlaceholder}</option>
              {FAMILIES.map((family) => (
                <option key={family.name} value={family.name}>
                  {locale === 'zh' ? family.zh : family.en}
                </option>
              ))}
              <option value="other">{locale === 'zh' ? '其他 / 定制' : 'Other / custom'}</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="inq-message">
            {t.contact.message} *
          </label>
          <textarea
            id="inq-message"
            rows={5}
            placeholder={t.contact.messagePlaceholder}
            className={`${fieldClass} resize-y`}
            {...register('message', { required: true })}
          />
          {errors.message && (
            <p className={errorClass}>
              <FiAlertCircle className="h-4 w-4" aria-hidden /> {t.contact.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={submitStatus === 'sending'}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 text-base font-semibold text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitStatus === 'sending' ? (
              <span
                className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
                aria-hidden
              />
            ) : (
              <FiSend className="h-5 w-5" aria-hidden />
            )}
            {submitStatus === 'sending' ? t.contact.sending : t.contact.send}
          </button>

          <a
            href={`${WHATSAPP_URL.split('?')[0]}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-green-600 px-5 text-base font-semibold text-green-700 hover:bg-green-50"
          >
            <FiMessageCircle className="h-5 w-5" aria-hidden />
            {t.cta.secondary}
          </a>
        </div>

        <p className="text-xs leading-relaxed text-slate-500">{t.contact.privacyNote}</p>

        {submitStatus === 'success' && (
          <div role="status" aria-live="polite" className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
            <p className="flex items-start gap-2 font-medium">
              <FiCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {t.contact.success}
            </p>
            <p className="mt-1 ps-6 text-green-800">{t.contact.successNote}</p>
            <p className="mt-2 ps-6 text-xs text-green-800">
              {SITE.email} · {SITE.mobileDisplay}
            </p>
          </div>
        )}
        {submitStatus === 'error' && (
          <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>
              {t.contact.error}{' '}
              <a
                className="font-semibold underline"
                href={draft ? buildMailto(draft) : `mailto:${SITE.email}`}
              >
                {SITE.email}
              </a>
              {errorMessage ? (
                <span className="mt-1 block text-xs text-red-700/80">{errorMessage}</span>
              ) : null}
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default InquiryForm;
