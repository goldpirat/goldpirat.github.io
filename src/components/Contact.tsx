import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

type FormData = {
  from_name: string;
  from_email: string;
  message: string;
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const checkRateLimit = async (email: string) => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
    const { data: submission, error } = await supabase
      .from('contact_submissions')
      .select('created_at')
      .eq('email', email)
      .gte('created_at', oneDayAgo.toISOString())
      .maybeSingle();
  
    if (error) {
      console.error('Error checking rate limit:', error);
      return false;
    }
    
    return !submission;
  };
  
  const onSubmit = async (data: FormData) => {
    if (!formRef.current) return;
    setIsSubmitting(true);

    try {
      const canSubmit = await checkRateLimit(data.from_email);
      if (!canSubmit) {
        toast({
          title: "Error",
          description: "You can only send one message per day. Please try again tomorrow.",
          variant: "destructive",
        });
        return;
      }

      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
      );

      await supabase
        .from('contact_submissions')
        .insert([{ email: data.from_email }]);

      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
      });
      reset();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="min-h-screen bg-white dark:bg-navy flex items-center justify-center px-4 py-16"
      id="contact"
    >
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Get In Touch
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8 text-center">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, 
          I'll try my best to get back to you!
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 mb-8 bg-white dark:bg-navy p-6 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div>
            <Input
              placeholder="Your Name"
              {...register("from_name", { required: "Name is required" })}
              className="bg-white dark:bg-navy border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              name="from_name"
            />
            {errors.from_name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.from_name.message}
              </span>
            )}
          </div>

          <div>
            <Input
              type="email"
              placeholder="Your Email"
              {...register("from_email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className="bg-white dark:bg-navy border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              name="from_email"
            />
            {errors.from_email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.from_email.message}
              </span>
            )}
          </div>

          <div>
            <Textarea
              placeholder="Your Message"
              {...register("message", { required: "Message is required" })}
              className="bg-white dark:bg-navy border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 min-h-[150px]"
              name="message"
            />
            {errors.message && (
              <span className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </span>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>

        <div className="flex justify-center gap-6">
          <a 
            href="mailto:florikusari28@gmail.com" 
            className="text-teal-600 hover:text-white transition-colors"
          >
            <Mail size={24} />
          </a>
          <a 
            href="https://github.com/goldpirat" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-teal-600 hover:text-white transition-colors"
          >
            <Github size={24} />
          </a>
          <a 
            href="https://linkedin.com/in/flori-kusari/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-teal-600 hover:text-white transition-colors"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
