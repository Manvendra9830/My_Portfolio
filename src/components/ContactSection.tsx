import { useState, useCallback, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Send, Mail, Phone, MapPin, Instagram, Linkedin, Github, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { personalInfo } from "@/data/portfolioData";
import {
  validateForm,
  sanitizeInput,
  recordSubmission,
  recordMessageHash,
  validateName,
  validateEmail,
  validateSubject,
  validateMessage,
} from "@/lib/contactValidation";
import type { ValidationResult } from "@/lib/contactValidation";

const MESSAGE_MAX_LENGTH = 5000;

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  // Honeypot field — hidden from humans, filled by bots
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [cooldown, setCooldown] = useState(0);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Auto-clear success state
  useEffect(() => {
    if (!isSuccess) return;
    const timer = setTimeout(() => setIsSuccess(false), 5000);
    return () => clearTimeout(timer);
  }, [isSuccess]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Real-time validation for touched fields
      if (touchedFields.has(name)) {
        let result: ValidationResult = { valid: true };
        switch (name) {
          case "name": result = validateName(value); break;
          case "email": result = validateEmail(value); break;
          case "subject": result = validateSubject(value); break;
          case "message": result = validateMessage(value); break;
        }
        setFieldErrors((prev) => {
          const next = { ...prev };
          if (result.valid) {
            delete next[name];
          } else {
            next[name] = result.error || "Invalid";
          }
          return next;
        });
      }
    },
    [touchedFields]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTouchedFields((prev) => new Set(prev).add(name));

      let result: ValidationResult = { valid: true };
      switch (name) {
        case "name": result = validateName(value); break;
        case "email": result = validateEmail(value); break;
        case "subject": result = validateSubject(value); break;
        case "message": result = validateMessage(value); break;
      }
      setFieldErrors((prev) => {
        const next = { ...prev };
        if (result.valid) {
          delete next[name];
        } else {
          next[name] = result.error || "Invalid";
        }
        return next;
      });
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check — silent reject
    if (honeypot) {
      // Pretend success to the bot
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      return;
    }

    // Sanitize inputs
    const sanitized = {
      name: sanitizeInput(formData.name),
      email: formData.email.trim().toLowerCase(),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message),
    };

    // Full validation pipeline
    const validation = validateForm(sanitized);

    if (!validation.valid) {
      if (validation.generalError) {
        toast({
          variant: "destructive",
          title: "Message Blocked",
          description: validation.generalError,
        });
        // If rate limited, start cooldown
        if (validation.generalError.includes("wait")) {
          const match = validation.generalError.match(/(\d+)s/);
          if (match) setCooldown(parseInt(match[1], 10));
        }
      }
      if (Object.keys(validation.fieldErrors).length > 0) {
        setFieldErrors(validation.fieldErrors as Record<string, string>);
        setTouchedFields(new Set(Object.keys(validation.fieldErrors)));
      }
      return;
    }

    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast({
        variant: "destructive",
        title: "Configuration Error",
        description: "EmailJS is not configured. Please contact the site owner.",
      });
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      to_name: "Manvendra Singh",
      from_name: sanitized.name,
      from_email: sanitized.email,
      subject: sanitized.subject,
      message: sanitized.message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      // Record for rate limiting and duplicate detection
      recordSubmission();
      recordMessageHash(sanitized.message);

      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setFieldErrors({});
      setTouchedFields(new Set());

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem sending your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const messageCharsRemaining = MESSAGE_MAX_LENGTH - formData.message.length;

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Let's <span className="gradient-text">Connect</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-card rounded-xl p-6 md:p-8 glow-border">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
                <CheckCircle className="w-16 h-16 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground text-sm">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot — invisible to humans */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className={fieldErrors.name ? "border-destructive focus:ring-destructive/20" : ""}
                    maxLength={100}
                    required
                  />
                  {fieldErrors.name && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className={fieldErrors.email ? "border-destructive focus:ring-destructive/20" : ""}
                    required
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className={fieldErrors.subject ? "border-destructive focus:ring-destructive/20" : ""}
                    maxLength={200}
                    required
                  />
                  {fieldErrors.subject && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <span className={`text-xs ${messageCharsRemaining < 100 ? "text-destructive" : "text-muted-foreground"}`}>
                      {messageCharsRemaining.toLocaleString()} chars left
                    </span>
                  </div>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className={fieldErrors.message ? "border-destructive focus:ring-destructive/20" : ""}
                    maxLength={MESSAGE_MAX_LENGTH}
                    required
                  />
                  {fieldErrors.message && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || cooldown > 0}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : cooldown > 0 ? (
                    <>Wait {cooldown}s</>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Get in Touch Section */}
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6 glow-border">
              <h3 className="font-bold text-lg mb-2">Get in Touch</h3>
              <p className="text-muted-foreground text-sm mb-6">I'm always open to discussing new opportunities and innovative projects.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href={`mailto:${personalInfo.email}`} className="font-medium hover:underline">{personalInfo.email}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">+91 9662789830</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">Raichur, Karnataka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Follow Me Section */}
        <div className="text-center mt-16">
          <h3 className="font-bold text-lg mb-4">Follow me on</h3>
          <div className="flex justify-center gap-6">
            <a href="https://www.instagram.com/man98.30/" target="_blank" rel="noopener noreferrer" className="p-3 glass-card rounded-full hover:text-primary glow-border transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 glass-card rounded-full hover:text-primary glow-border transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-3 glass-card rounded-full hover:text-primary glow-border transition-colors">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
