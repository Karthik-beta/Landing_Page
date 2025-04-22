import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "../hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export const ContactForm = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("https://formspree.io/f/mldrnwbb", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast({
                    title: "Message Sent",
                    description: "Your message has been sent successfully!",
                    variant: "default",
                });
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                    variant: "destructive",
                    action: (
                        <ToastAction altText="Try again" onClick={handleSubmit}>
                            Try again
                        </ToastAction>
                    ),
                });
            }
        } catch {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                variant: "destructive",
                action: (
                    <ToastAction altText="Try again" onClick={handleSubmit}>
                        Try again
                    </ToastAction>
                ),
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="container py-16 space-y-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
                Get in <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">Touch</span>
            </h2>
            <p className="text-muted-foreground text-xl text-center">
                Have questions or need assistance? Send us a message, and we’ll get back to you shortly.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 w-full"
                >
                    <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-muted/50 dark:bg-muted/80"
                    />
                    <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-muted/50 dark:bg-muted/80"
                    />
                    <Input
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="bg-muted/50 dark:bg-muted/80"
                    />
                    <Textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="bg-muted/50 dark:bg-muted/80"
                    />
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Sending..." : "Send Message"}
                    </Button>
                </form>

                {/* Google Maps Embed */}
                <div className="w-full">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15553.570774466965!2d77.69089151697227!3d12.946705197190557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13b7dd47fe43%3A0x3ec366ea1d0b70c5!2sCGI!5e0!3m2!1sen!2sin!4v1723213950349!5m2!1sen!2sin"
                        style={{ border: "none", width: "100%", height: "100%" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps Embed: Pivotr Technologies #220 CGI, Marathalli - Visit Us in Bengaluru"
                        className="h-64 lg:h-full"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

