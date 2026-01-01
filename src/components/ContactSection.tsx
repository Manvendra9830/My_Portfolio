import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, Mail, Phone, MapPin, Instagram, Linkedin, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { personalInfo } from "@/data/portfolioData";
import { profanityBlocklist } from "@/lib/profanity";

// Helper function for validation
const validateContent = (data: { name: string; subject: string; message: string; }): boolean => {
  const combinedText = `${data.name} ${data.subject} ${data.message}`.toLowerCase();

  // 1. Vulgarity Check
  if (profanityBlocklist.some(word => combinedText.includes(word))) {
    return false;
  }

  // 2. Spam Check: Look for multiple links
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const links = combinedText.match(urlRegex);
  if (links && links.length > 1) {
    return false;
  }

  // 3. Spam Check: Look for repetitive character sequences (e.g., "aaaaaa", "111111")
  const repetitiveCharRegex = /(.)\1{5,}/g;
  if (repetitiveCharRegex.test(combinedText)) {
    return false;
  }
  
  // 4. Meaningless message check
  if (data.message.length < 10) {
      return false;
  }

  return true;
};


export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill out all fields before sending.",
      });
      return;
    }

    // --- Updated Validation Step ---
    if (!validateContent(formData)) {
      toast({
        variant: "destructive",
        title: "Message Blocked",
        description: "Your message could not be submitted. Please review your content.",
      });
      return; // Stop the submission
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
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
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
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form fields remain the same */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input id="subject" name="subject" placeholder="What's this about?" value={formData.subject} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea id="message" name="message" placeholder="Your message..." rows={5} value={formData.message} onChange={handleInputChange} required />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 disabled:opacity-50">
                <Send className="w-5 h-5" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
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
            <a href="tel:+919662789830" className="p-3 glass-card rounded-full hover:text-primary glow-border transition-colors">
              <Phone className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

