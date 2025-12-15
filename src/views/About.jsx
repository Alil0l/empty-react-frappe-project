import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiLightBulb, HiUsers } from 'react-icons/hi';
import { FaTrophy } from 'react-icons/fa';

export default function About() {
	const { t } = useTranslation();

	const features = [
		{
			icon: <HiAcademicCap className="w-8 h-8" />,
			title: t('about.expertInstructors', 'Expert Instructors'),
			description: t('about.expertInstructorsDesc', 'Learn from industry professionals with years of experience in civil and architecture engineering.')
		},
		{
			icon: <HiLightBulb className="w-8 h-8" />,
			title: t('about.practicalLearning', 'Practical Learning'),
			description: t('about.practicalLearningDesc', 'Hands-on projects and real-world applications to build your skills.')
		},
		{
			icon: <HiUsers className="w-8 h-8" />,
			title: t('about.community', 'Active Community'),
			description: t('about.communityDesc', 'Join a vibrant community of students and professionals.')
		},
		{
			icon: <FaTrophy className="w-8 h-8" />,
			title: t('about.certification', 'Certification'),
			description: t('about.certificationDesc', 'Earn recognized certificates upon course completion.')
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
						{t('about.title', 'About RESK Academy')}
					</h1>
					<p className="text-lg sm:text-xl text-resk-secondary dark:text-resk-light font-['Inter'] max-w-3xl mx-auto">
						{t('about.subtitle', 'Empowering the next generation of engineers through expert-led courses and practical learning experiences.')}
					</p>
				</motion.div>

				{/* Mission Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="bg-white dark:bg-resk-primary rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mb-8 border border-resk-light/20 dark:border-resk-secondary/30"
				>
					<h2 className="text-2xl sm:text-3xl font-bold text-resk-dark dark:text-white font-['Poppins'] mb-4">
						{t('about.mission', 'Our Mission')}
					</h2>
					<p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 font-['Inter'] leading-relaxed">
						{t('about.missionText', 'At RESK Academy, we are dedicated to providing high-quality education in civil and architecture engineering. Our mission is to bridge the gap between academic knowledge and practical skills, preparing our students for successful careers in the engineering industry.')}
					</p>
				</motion.div>

				{/* Features Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
							className="bg-white dark:bg-resk-primary rounded-xl shadow-lg p-6 border border-resk-light/20 dark:border-resk-secondary/30"
						>
							<div className="flex items-start space-x-4 rtl:space-x-reverse">
								<div className="p-3 rounded-lg bg-mysecondary/10 dark:bg-mysecondary/20 text-mysecondary flex-shrink-0">
									{feature.icon}
								</div>
								<div>
									<h3 className="text-xl font-bold text-resk-dark dark:text-white font-['Poppins'] mb-2">
										{feature.title}
									</h3>
									<p className="text-gray-600 dark:text-gray-400 font-['Inter']">
										{feature.description}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Values Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.7 }}
					className="bg-white dark:bg-resk-primary rounded-xl shadow-lg p-6 sm:p-8 md:p-10 border border-resk-light/20 dark:border-resk-secondary/30"
				>
					<h2 className="text-2xl sm:text-3xl font-bold text-resk-dark dark:text-white font-['Poppins'] mb-6">
						{t('about.values', 'Our Values')}
					</h2>
					<div className="space-y-4">
						<div className="flex items-start space-x-3 rtl:space-x-reverse">
							<div className="w-2 h-2 bg-mysecondary rounded-full mt-2 flex-shrink-0"></div>
							<p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 font-['Inter']">
								{t('about.value1', 'Excellence in education and continuous improvement')}
							</p>
						</div>
						<div className="flex items-start space-x-3 rtl:space-x-reverse">
							<div className="w-2 h-2 bg-mysecondary rounded-full mt-2 flex-shrink-0"></div>
							<p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 font-['Inter']">
								{t('about.value2', 'Practical, hands-on learning experiences')}
							</p>
						</div>
						<div className="flex items-start space-x-3 rtl:space-x-reverse">
							<div className="w-2 h-2 bg-mysecondary rounded-full mt-2 flex-shrink-0"></div>
							<p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 font-['Inter']">
								{t('about.value3', 'Supporting student success and career growth')}
							</p>
						</div>
						<div className="flex items-start space-x-3 rtl:space-x-reverse">
							<div className="w-2 h-2 bg-mysecondary rounded-full mt-2 flex-shrink-0"></div>
							<p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 font-['Inter']">
								{t('about.value4', 'Building a strong professional community')}
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

