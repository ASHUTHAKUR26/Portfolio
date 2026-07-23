import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Send, Loader2, AlertTriangle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Toast, type ToastState } from "@/components/ui/Toast";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
  isEmailjsConfigured,
} from "@/config/emailjs";

type FormValues = { name: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Enter your name (at least 2 characters).";
  }
  if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

export function AskAshu() {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  function handleChange(field: keyof FormValues, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!isEmailjsConfigured) {
      setToast({
        type: "error",
        message:
          "Contact form isn't fully set up yet — EmailJS keys are missing. See src/config/emailjs.ts.",
      });
      return;
    }

    setSubmitting(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: values.name,
          from_email: values.email,
          message: values.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setToast({ type: "success", message: "Message sent — thanks! I'll get back to you soon." });
      setValues({ name: "", email: "", message: "" });
    } catch {
      setToast({
        type: "error",
        message: "Couldn't send that — please try again or email me directly.",
      });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 5000);
    }
  }

  return (
    <section id="ask-ashu" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="ask ashu"
          title="Got a question? Just ask."
          description="Whatever it is — a role, a project idea, or just feedback on this site — send it straight to my inbox."
        />

        <Reveal delay={0.08}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="glass mt-12 flex flex-col gap-6 rounded-3xl p-8 sm:p-10"
          >
            {!isEmailjsConfigured && (
              <div className="flex items-start gap-2 rounded-xl border border-[var(--color-purple)]/40 bg-[var(--color-purple)]/10 p-3 text-xs text-[var(--color-muted)]">
                <AlertTriangle size={14} className="mt-0.5 shrink-0 text-[var(--color-purple)]" />
                Form UI is fully wired up, but email delivery needs EmailJS keys
                added in <code className="font-mono">src/config/emailjs.ts</code>.
              </div>
            )}

            {/* <div className="grid gap-6 sm:grid-cols-2"> */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field
                label="Name"
                htmlFor="name"
                error={errors.name}
              >
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors focus-visible:border-[var(--color-accent)]"
                  placeholder="Your name"
                />
              </Field>

              <Field label="Email" htmlFor="email" error={errors.email}>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors focus-visible:border-[var(--color-accent)]"
                  placeholder="you@example.com"
                />
              </Field>
            </div>

            <Field label="Message" htmlFor="message" error={errors.message}>
              <textarea
                id="message"
                rows={5}
                value={values.message}
                onChange={(e) => handleChange("message", e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="w-full resize-none rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors focus-visible:border-[var(--color-accent)]"
                placeholder="What's on your mind?"
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-medium text-[var(--color-bg)] transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send size={16} /> Send message
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>

      <Toast toast={toast} />
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm text-[var(--color-muted)]">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-xs text-[var(--color-purple)]">
          {error}
        </p>
      )}
    </div>
  );
}