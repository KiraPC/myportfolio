import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from '$env/static/private';

export function createTransporter() {
	return nodemailer.createTransport({
		host: SMTP_HOST || 'smtp.gmail.com',
		port: parseInt(SMTP_PORT || '587'),
		secure: false,
		auth: {
			user: SMTP_USER,
			pass: SMTP_PASS
		}
	});
}
