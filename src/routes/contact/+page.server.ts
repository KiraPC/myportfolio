import { fail } from '@sveltejs/kit';
import { createTransporter } from '$lib/server/email.js';
import type { RequestEvent } from '@sveltejs/kit';

export interface ContactInfo {
    icon: string;
    title: string;
    value: string;
    action?: string;
}

// Email templates
const emailTemplates = new Map([
	['it', {
		subject: (subject: string) => `Grazie per il tuo messaggio - ${subject}`,
		html: (name: string, subject: string, message: string) => `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<div style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); padding: 30px; text-align: center; color: white;">
					<h1 style="margin: 0; font-size: 24px;">Grazie per il tuo messaggio!</h1>
				</div>
				
				<div style="background: white; padding: 30px;">
					<p style="font-size: 16px; line-height: 1.6; color: #374151;">Ciao <strong>${name}</strong>,</p>
					
					<p style="line-height: 1.6; color: #374151;">
						Grazie per avermi contattato tramite il mio portfolio. Ho ricevuto il tuo messaggio riguardo "<strong>${subject}</strong>" e ti risponderò al più presto.
					</p>
					
					<p style="line-height: 1.6; color: #374151;">
						Nel frattempo, sentiti libero di consultare il mio profilo LinkedIn o dare un'occhiata ai miei progetti su GitHub.
					</p>
					
					<div style="margin: 30px 0; padding: 20px; background: #f8fafc; border-left: 4px solid #3B82F6;">
						<p style="margin: 0; font-weight: bold; color: #1e293b;">Riepilogo del tuo messaggio:</p>
						<p style="margin: 8px 0; color: #6b7280;"><strong>Oggetto:</strong> ${subject}</p>
						<p style="margin: 8px 0; color: #6b7280;"><strong>Messaggio:</strong> ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
					</div>
					
					<p style="line-height: 1.6; color: #374151;">
						A presto,<br>
						<strong>Pasquale Carmine Carbone</strong><br>
						Full Stack Software Engineer
					</p>
					
					<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
						<p style="margin: 0; text-align: center;">
							<a href="https://linkedin.com/in/pasquale-carmine-carbone" style="color: #3B82F6; text-decoration: none; margin: 0 10px;">LinkedIn</a> |
							<a href="https://github.com/KiraPC" style="color: #3B82F6; text-decoration: none; margin: 0 10px;">GitHub</a>
						</p>
					</div>
				</div>
			</div>
		`
	}],
	['en', {
		subject: (subject: string) => `Thank you for your message - ${subject}`,
		html: (name: string, subject: string, message: string) => `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<div style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); padding: 30px; text-align: center; color: white;">
					<h1 style="margin: 0; font-size: 24px;">Thank you for your message!</h1>
				</div>
				
				<div style="background: white; padding: 30px;">
					<p style="font-size: 16px; line-height: 1.6; color: #374151;">Hi <strong>${name}</strong>,</p>
					
					<p style="line-height: 1.6; color: #374151;">
						Thank you for contacting me through my portfolio. I have received your message regarding "<strong>${subject}</strong>" and I will get back to you as soon as possible.
					</p>
					
					<p style="line-height: 1.6; color: #374151;">
						In the meantime, feel free to check out my LinkedIn profile or take a look at my projects on GitHub.
					</p>
					
					<div style="margin: 30px 0; padding: 20px; background: #f8fafc; border-left: 4px solid #3B82F6;">
						<p style="margin: 0; font-weight: bold; color: #1e293b;">Summary of your message:</p>
						<p style="margin: 8px 0; color: #6b7280;"><strong>Subject:</strong> ${subject}</p>
						<p style="margin: 8px 0; color: #6b7280;"><strong>Message:</strong> ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
					</div>
					
					<p style="line-height: 1.6; color: #374151;">
						Best regards,<br>
						<strong>Pasquale Carmine Carbone</strong><br>
						Full Stack Software Engineer
					</p>
					
					<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
						<p style="margin: 0; text-align: center;">
							<a href="https://linkedin.com/in/pasquale-carmine-carbone" style="color: #3B82F6; text-decoration: none; margin: 0 10px;">LinkedIn</a> |
							<a href="https://github.com/KiraPC" style="color: #3B82F6; text-decoration: none; margin: 0 10px;">GitHub</a>
						</p>
					</div>
				</div>
			</div>
		`
	}]
]);

function getAutoReplyTemplate(lang: string, name: string, subject: string, message: string) {
	const template = emailTemplates.get(lang) || emailTemplates.get('en')!;
	
	return {
		subject: template.subject(subject),
		html: template.html(name, subject, message)
	};
}

export const load = async () => {
    const contactInfo: ContactInfo[] = [
        {
            icon: '📧',
            title: 'contact.info.email.title',
            value: 'contact.info.email.value',
            action: 'mailto:me@pcarbone.it'
        },
        {
            icon: '💼',
            title: 'contact.info.linkedin.title',
            value: 'contact.info.linkedin.value',
            action: 'https://linkedin.com/in/pasquale-carmine-carbone'
        },
        {
            icon: '🐙',
            title: 'contact.info.github.title',
            value: 'contact.info.github.value',
            action: 'https://github.com/KiraPC'
        },
        {
            icon: '📍',
            title: 'contact.info.location.title',
            value: 'contact.info.location.value',
            action: ''
        }
    ];

    return {
        contactInfo
    };
};

export const actions = {
	contact: async ({ request, cookies }: RequestEvent) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const email = data.get('email') as string;
		const subject = data.get('subject') as string;
		const message = data.get('message') as string;
		
		// Detect language from cookie or Accept-Language header
		const userLang = cookies.get('lang') || 
			request.headers.get('accept-language')?.includes('it') ? 'it' : 'en';

		// Validation
		const errors: Record<string, string> = {};

		if (!name?.trim()) {
			errors.name = 'contact.form.name.required';
		}

		if (!email?.trim()) {
			errors.email = 'contact.form.email.required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'contact.form.email.invalid';
		}

		if (!subject?.trim()) {
			errors.subject = 'contact.form.subject.required';
		}

		if (!message?.trim()) {
			errors.message = 'contact.form.message.required';
		} else if (message.trim().length < 10) {
			errors.message = 'contact.form.message.minLength';
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, {
				errors,
				name,
				email,
				subject,
				message
			});
		}

		try {
			const transporter = createTransporter();

			// Email to you
			await transporter.sendMail({
				from: `"Portfolio Contact Form" <me@pcarbone.it>`,
				to: 'me@pcarbone.it',
				subject: `[Portfolio] ${subject}`,
				html: `
					<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
						<div style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); padding: 30px; text-align: center; color: white;">
							<h1 style="margin: 0; font-size: 24px;">Nuovo messaggio dal Portfolio</h1>
						</div>
						
						<div style="background: #f8fafc; padding: 30px; border-left: 4px solid #3B82F6;">
							<h2 style="color: #1e293b; margin-top: 0;">Dettagli del contatto</h2>
							<p style="margin: 8px 0;"><strong>Nome:</strong> ${name}</p>
							<p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3B82F6;">${email}</a></p>
							<p style="margin: 8px 0;"><strong>Oggetto:</strong> ${subject}</p>
						</div>
						
						<div style="background: white; padding: 30px; border: 1px solid #e2e8f0;">
							<h3 style="color: #1e293b; margin-top: 0;">Messaggio</h3>
							<div style="background: #f1f5f9; padding: 20px; border-radius: 8px; line-height: 1.6;">
								${message.replace(/\n/g, '<br>')}
							</div>
						</div>
						
						<div style="background: #1e293b; color: white; padding: 20px; text-align: center; font-size: 14px;">
							<p style="margin: 0;">Inviato dal form di contatto del portfolio - ${new Date().toLocaleDateString('it-IT')}</p>
						</div>
					</div>
				`
			});

			// Auto-reply to sender
			const autoReplyTemplate = getAutoReplyTemplate(userLang, name, subject, message);
			await transporter.sendMail({
				from: `"Pasquale Carmine Carbone" <me@pcarbone.it>`,
				to: email,
				subject: autoReplyTemplate.subject,
				html: autoReplyTemplate.html
			});

			return {
				success: true
			};
		} catch (error) {
			console.error('Error sending email:', error);
			return fail(500, {
				errors: { general: 'contact.form.generalError' },
				name,
				email,
				subject,
				message
			});
		}
	}
};
