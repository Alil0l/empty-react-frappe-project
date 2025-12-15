import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

export default function WhatsAppFloat() {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const whatsappNumber = '201064052253';
	const whatsappMessage = t('whatsapp.message', 'Hello, I would like to inquire about the courses available at RESK Academy');

	const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

	return (
		<>
			{/* Floating Button */}
			<motion.button
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={() => setIsOpen(!isOpen)}
				className="fixed bottom-6 end-6 z-50 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300"
				aria-label={t('whatsapp.title', 'Chat with us')}
			>
				<FaWhatsapp className="w-7 h-7" />
			</motion.button>

			{/* Popup Card */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
							className="fixed inset-0 bg-black/50 z-40"
						/>

						{/* Card */}
						<motion.div
							initial={{ opacity: 0, scale: 0.8, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.8, y: 20 }}
							className="fixed bottom-24 end-6 z-50 bg-white dark:bg-resk-primary rounded-xl shadow-2xl p-6 w-80 border border-resk-light/20 dark:border-resk-secondary/30"
						>
							<button
								onClick={() => setIsOpen(false)}
								className="absolute top-4 end-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
								aria-label={t('common.close', 'Close')}
							>
								<HiX className="w-5 h-5" />
							</button>

							<div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
								<div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
									<FaWhatsapp className="w-6 h-6 text-white" />
								</div>
								<div>
									<h3 className="font-bold text-resk-dark dark:text-white font-['Inter']">
										{t('whatsapp.title', 'Chat with us')}
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400 font-['Inter']">
										{t('whatsapp.subtitle', 'We usually reply within minutes')}
									</p>
								</div>
							</div>

							<a
								href={whatsappUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="block w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 font-semibold text-center font-['Inter']"
							>
								{t('whatsapp.startChat', 'Start Chat')}
							</a>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}

