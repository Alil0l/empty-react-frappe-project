import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker, HiClock } from 'react-icons/hi';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
	const { t } = useTranslation();

	const whatsappNumber = '201064052253';
	const whatsappMessage = t('contact.whatsappMessage', 'Hello, I would like to inquire about the courses available at RESK Academy');

	const contactInfo = [
		{
			icon: <HiMail className="w-6 h-6" />,
			title: t('contact.email', 'Email'),
			value: 'info@reskacademy.com',
			link: 'mailto:info@reskacademy.com'
		},
		{
			icon: <HiPhone className="w-6 h-6" />,
			title: t('contact.phone', 'Phone'),
			value: '+20 10 6405 2253',
			link: 'tel:+201064052253'
		},
		{
			icon: <HiLocationMarker className="w-6 h-6" />,
			title: t('contact.address', 'Address'),
			value: t('contact.addressValue', 'Cairo, Giza, Egypt'),
			link: 'https://maps.google.com/?q=Cairo,Giza,Egypt'
		},
		{
			icon: <HiClock className="w-6 h-6" />,
			title: t('contact.workingHours', 'Working Hours'),
			value: t('contact.workingHoursValue', 'Sunday - Thursday: 9:00 AM - 6:00 PM')
		}
	];

	const socialLinks = [
		{
			name: 'Facebook',
			url: 'https://www.facebook.com/RESKAcademy/',
			icon: <FaFacebook className="w-6 h-6" />,
			color: 'bg-blue-600 hover:bg-blue-700'
		},
		{
			name: 'Instagram',
			url: 'https://www.instagram.com/reskacademy_/',
			icon: <FaInstagram className="w-6 h-6" />,
			color: 'bg-pink-600 hover:bg-pink-700'
		},
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/company/resk-academy/',
			icon: <FaLinkedin className="w-6 h-6" />,
			color: 'bg-blue-700 hover:bg-blue-800'
		},
		{
			name: 'TikTok',
			url: 'https://www.tiktok.com/@reskacademy1',
			icon: <FaTiktok className="w-6 h-6" />,
			color: 'bg-black hover:bg-gray-800'
		},
		{
			name: 'Twitter',
			url: 'https://x.com/reskacademy',
			icon: <FaTwitter className="w-6 h-6" />,
			color: 'bg-black hover:bg-gray-800'
		},
		{
			name: 'YouTube',
			url: 'https://www.youtube.com/@reskacademy2656',
			icon: <FaYoutube className="w-6 h-6" />,
			color: 'bg-red-600 hover:bg-red-700'
		}
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-resk-light/10 via-white to-resk-light/10 dark:from-resk-darkest dark:via-resk-dark dark:to-resk-primary py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto">
				{/* Hero Section */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-resk-dark dark:text-white font-['Poppins'] mb-4">
						{t('contact.title', 'Get in Touch')}
					</h1>
					<p className="text-lg sm:text-xl text-resk-secondary dark:text-resk-light font-['Inter'] max-w-3xl mx-auto">
						{t('contact.subtitle', "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.")}
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Contact Information */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="bg-white dark:bg-resk-primary rounded-xl shadow-lg p-6 sm:p-8 border border-resk-light/20 dark:border-resk-secondary/30"
					>
						<h2 className="text-2xl sm:text-3xl font-bold text-resk-dark dark:text-white font-['Poppins'] mb-6">
							{t('contact.contactInfo', 'Contact Information')}
						</h2>
						<p className="text-gray-600 dark:text-gray-400 font-['Inter'] mb-6">
							{t('contact.contactInfoDesc', "We're here to help. Contact us through any method you prefer.")}
						</p>

						<div className="space-y-6 mb-8">
							{contactInfo.map((info, index) => (
								<div key={index} className="flex items-start space-x-4 rtl:space-x-reverse group">
									<div className="p-3 rounded-full bg-mysecondary/10 dark:bg-mysecondary/20 text-mysecondary group-hover:bg-mysecondary group-hover:text-white transition-all duration-300 flex-shrink-0">
										{info.icon}
									</div>
									<div className="flex-1">
										<h3 className="font-semibold text-resk-dark dark:text-white mb-1 font-['Inter']">
											{info.title}
										</h3>
										{info.link ? (
											<a
												href={info.link}
												className="text-gray-600 dark:text-gray-400 hover:text-mysecondary transition-colors duration-300 font-['Inter']"
											>
												{info.value}
											</a>
										) : (
											<p className="text-gray-600 dark:text-gray-400 font-['Inter']">
												{info.value}
											</p>
										)}
									</div>
								</div>
							))}
						</div>

						{/* WhatsApp Section */}
						<div className="p-6 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 mb-8">
							<div className="flex items-center space-x-4 rtl:space-x-reverse">
								<div className="p-3 rounded-full bg-green-500 text-white">
									<FaWhatsapp className="w-6 h-6" />
								</div>
								<div className="flex-1">
									<h3 className="font-semibold text-resk-dark dark:text-white mb-2 font-['Inter']">
										{t('contact.whatsappTitle', 'Contact us on WhatsApp')}
									</h3>
									<p className="text-gray-600 dark:text-gray-400 mb-4 font-['Inter']">
										{t('contact.whatsappDesc', 'Get instant answers to your inquiries')}
									</p>
									<a
										href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 font-semibold font-['Inter']"
									>
										<FaWhatsapp className="w-5 h-5 me-2" />
										{t('contact.startChat', 'Start Chat')}
									</a>
								</div>
							</div>
						</div>

						{/* Social Media */}
						<div>
							<h3 className="font-semibold text-resk-dark dark:text-white mb-4 font-['Inter']">
								{t('contact.socialMedia', 'Follow us on Social Media')}
							</h3>
							<div className="flex flex-wrap gap-3">
								{socialLinks.map((social, index) => (
									<a
										key={index}
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										className={`w-12 h-12 rounded-full text-white ${social.color} transition-all duration-300 hover:scale-110 flex items-center justify-center`}
										title={social.name}
										aria-label={social.name}
									>
										{social.icon}
									</a>
								))}
							</div>
						</div>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="bg-white dark:bg-resk-primary rounded-xl shadow-lg p-6 sm:p-8 border border-resk-light/20 dark:border-resk-secondary/30"
					>
						<h2 className="text-2xl sm:text-3xl font-bold text-resk-dark dark:text-white font-['Poppins'] mb-6">
							{t('contact.sendMessage', 'Send us a Message')}
						</h2>
						<form className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-resk-dark dark:text-white mb-2 font-['Inter']">
										{t('contact.name', 'Name')}
									</label>
									<input
										type="text"
										className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-resk-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mysecondary font-['Inter']"
										placeholder={t('contact.namePlaceholder', 'Full Name')}
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-resk-dark dark:text-white mb-2 font-['Inter']">
										{t('contact.email', 'Email')}
									</label>
									<input
										type="email"
										className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-resk-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mysecondary font-['Inter']"
										placeholder={t('contact.emailPlaceholder', 'Email Address')}
									/>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-resk-dark dark:text-white mb-2 font-['Inter']">
									{t('contact.subject', 'Subject')}
								</label>
								<input
									type="text"
									className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-resk-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mysecondary font-['Inter']"
									placeholder={t('contact.subjectPlaceholder', 'Message Subject')}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-resk-dark dark:text-white mb-2 font-['Inter']">
									{t('contact.message', 'Message')}
								</label>
								<textarea
									rows={6}
									className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-resk-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mysecondary font-['Inter']"
									placeholder={t('contact.messagePlaceholder', 'Write your message here...')}
								></textarea>
							</div>
							<button
								type="submit"
								className="w-full px-8 py-4 bg-gradient-to-r from-resk-primary to-resk-secondary text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold text-lg font-['Inter']"
							>
								{t('contact.sendButton', 'Send Message')}
							</button>
						</form>
					</motion.div>
				</div>
			</div>
		</div>
	);
}

