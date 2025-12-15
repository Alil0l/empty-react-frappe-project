import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';

export default function Terms() {
	const { t } = useTranslation();

	return (
		<div className="min-h-screen bg-gradient-to-br from-resk-light/10 via-white to-resk-light/10 dark:from-resk-darkest dark:via-resk-dark dark:to-resk-primary py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				{/* Back Button */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					className="mb-6"
				>
					<Link
						to="/portal"
						className="inline-flex items-center space-x-2 rtl:space-x-reverse text-resk-primary dark:text-resk-secondary hover:text-resk-secondary dark:hover:text-resk-primary transition-colors font-['Inter']"
					>
						<HiArrowLeft className="w-5 h-5" />
						<span>{t('terms.back', 'Back')}</span>
					</Link>
				</motion.div>

				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-8"
				>
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-resk-dark dark:text-white font-['Poppins'] mb-4">
						{t('terms.title', 'Terms and Conditions')}
					</h1>
					<p className="text-sm text-gray-600 dark:text-gray-400 font-['Inter']">
						{t('terms.lastUpdated', 'Last updated: {date}', { date: new Date().toLocaleDateString() })}
					</p>
				</motion.div>

				{/* Content */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="bg-white dark:bg-resk-primary rounded-xl shadow-lg p-6 sm:p-8 md:p-10 border border-resk-light/20 dark:border-resk-secondary/30 space-y-6"
				>
					{/* Section 1 */}
					<section>
						<h2 className="text-2xl font-bold text-resk-dark dark:text-white font-['Poppins'] mb-3">
							{t('terms.section1Title', '1. Acceptance of Terms')}
						</h2>
						<p className="text-gray-700 dark:text-gray-300 font-['Inter'] leading-relaxed">
							{t('terms.section1Content', 'By accessing and using RESK Academy, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.')}
						</p>
					</section>

					{/* Section 2 */}
					<section>
						<h2 className="text-2xl font-bold text-resk-dark dark:text-white font-['Poppins'] mb-3">
							{t('terms.section2Title', '2. Use License')}
						</h2>
						<p className="text-gray-700 dark:text-gray-300 font-['Inter'] leading-relaxed mb-3">
							{t('terms.section2Content', 'Permission is granted to temporarily access the materials on RESK Academy\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:')}
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-['Inter'] ml-4">
							<li>{t('terms.section2Item1', 'Modify or copy the materials')}</li>
							<li>{t('terms.section2Item2', 'Use the materials for any commercial purpose or for any public display')}</li>
							<li>{t('terms.section2Item3', 'Attempt to decompile or reverse engineer any software contained on the website')}</li>
							<li>{t('terms.section2Item4', 'Remove any copyright or other proprietary notations from the materials')}</li>
						</ul>
					</section>

					{/* Section 3 */}
					<section>
						<h2 className="text-2xl font-bold text-resk-dark dark:text-white font-['Poppins'] mb-3">
							{t('terms.section3Title', '3. User Account')}
						</h2>
						<p className="text-gray-700 dark:text-gray-300 font-['Inter'] leading-relaxed">
							{t('terms.section3Content', 'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.')}
						</p>
					</section>

					{/* Section 4 */}
					<section>
						<h2 className="text-2xl font-bold text-resk-dark dark:text-white font-['Poppins'] mb-3">
							{t('terms.section4Title', '4. Disclaimer')}
						</h2>
						<p className="text-gray-700 dark:text-gray-300 font-['Inter'] leading-relaxed">
							{t('terms.section4Content', 'The materials on RESK Academy\'s website are provided on an \'as is\' basis. RESK Academy makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.')}
						</p>
					</section>

					{/* Section 5 */}
					<section>
						<h2 className="text-2xl font-bold text-resk-dark dark:text-white font-['Poppins'] mb-3">
							{t('terms.section5Title', '5. Limitations')}
						</h2>
						<p className="text-gray-700 dark:text-gray-300 font-['Inter'] leading-relaxed">
							{t('terms.section5Content', 'In no event shall RESK Academy or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on RESK Academy\'s website.')}
						</p>
					</section>

					{/* Section 6 */}
					<section>
						<h2 className="text-2xl font-bold text-resk-dark dark:text-white font-['Poppins'] mb-3">
							{t('terms.section6Title', '6. Revisions')}
						</h2>
						<p className="text-gray-700 dark:text-gray-300 font-['Inter'] leading-relaxed">
							{t('terms.section6Content', 'RESK Academy may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.')}
						</p>
					</section>

					{/* Section 7 */}
					<section>
						<h2 className="text-2xl font-bold text-resk-dark dark:text-white font-['Poppins'] mb-3">
							{t('terms.section7Title', '7. Contact Information')}
						</h2>
						<p className="text-gray-700 dark:text-gray-300 font-['Inter'] leading-relaxed">
							{t('terms.section7Content', 'If you have any questions about these Terms and Conditions, please contact us at info@reskacademy.com or visit our contact page.')}
						</p>
					</section>
				</motion.div>
			</div>
		</div>
	);
}

