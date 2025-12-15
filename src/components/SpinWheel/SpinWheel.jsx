import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { HiGift, HiSparkles, HiCheckCircle, HiStar, HiEmojiHappy } from 'react-icons/hi';
import { FaTrophy } from 'react-icons/fa';
import axios from 'axios';

export default function SpinWheel({
	// Configurable percentages for each value (should total to 100)
	percentages = {
		10: 70,   // 50% chance to win 10 points
		25: 20,   // 30% chance to win 25 points
		50: 8,   // 15% chance to win 50 points
		100: 2,   // 5% chance to win 100 points
	}
}) {
	const { t } = useTranslation();
	const { isDarkMode } = useTheme();
	
	// State management
	const [spinStatus, setSpinStatus] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSpinning, setIsSpinning] = useState(false);
	const [currentResult, setCurrentResult] = useState(null);
	const [showCelebration, setShowCelebration] = useState(false);
	const [rotation, setRotation] = useState(0);
	const [error, setError] = useState(null);
	const wheelRef = useRef(null);
	
	// Create 14 segments: 10,25,10,25,10,50,10,100,10,25,10,50,10,25
	const segments = useMemo(() => {
		const segmentOrder = [10, 25, 10, 50, 10, 25, 10, 100, 10, 25, 10, 50, 10, 25];
		
		return segmentOrder.map((value, index) => ({
			id: index + 1,
			value: value,
		}));
	}, []);

	// Calculate angles for each segment (equal visual distribution)
	const segmentAngle = 360 / segments.length;
	let cumulativeAngle = 0;
	const segmentAngles = segments.map(seg => {
		const startAngle = cumulativeAngle;
		cumulativeAngle += segmentAngle;
		return {
			...seg,
			startAngle,
			endAngle: cumulativeAngle,
			angle: segmentAngle,
		};
	});

	// Fetch user's spin status on component mount
	useEffect(() => {
		fetchSpinStatus();
	}, []);

	const fetchSpinStatus = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const response = await axios.get('/api/method/landing.resk_landing.api.spin_wheel.get_spin_status', {
				headers: {
					'X-Frappe-CSRF-Token': window.csrf_token
				}
			});
			setSpinStatus(response.data.message);
		} catch (err) {
			console.error('Error fetching spin status:', err);
			setError(err.response?.data?.message || t('spinWheel.errorLoading', 'Error loading spin status'));
		} finally {
			setIsLoading(false);
		}
	};

	// Calculate rotation to land on winner
	const calculateRotation = (winnerValue) => {
		// Find all segments with this value
		const segmentsWithValue = segmentAngles.filter(seg => seg.value === winnerValue);
		// Pick a random one for visual variety
		const winnerSegment = segmentsWithValue[Math.floor(Math.random() * segmentsWithValue.length)];
		
		const winnerStartAngle = winnerSegment.startAngle;
		const winnerAngle = winnerSegment.angle;
		const winnerCenterAngle = winnerStartAngle + winnerAngle / 2;
		
		// Point the indicator (at 0 degrees) to the center of the winner segment
		const targetRotation = 270 - winnerCenterAngle;
		
		// Add multiple full rotations for visual effect
		const fullRotations = 8;
		return rotation + fullRotations * 360 + targetRotation;
	};

	const handleSpin = async () => {
		if (isSpinning || !spinStatus?.can_spin) return;
		
		try {
			setIsSpinning(true);
			setError(null);
			setCurrentResult(null);
			setShowCelebration(false);
			
			// Call backend API to record spin (server-side validation and result generation)
			const response = await axios.post('/api/method/landing.resk_landing.api.spin_wheel.record_spin', {}, {
				headers: {
					'X-Frappe-CSRF-Token': window.csrf_token
				}
			});
			
			const { spin_value, spin_number, status, can_spin_again, can_choose } = response.data.message;
			
			// Find segment with the spin value
			const winnerSegment = segments.find(seg => seg.value === spin_value) || segments[0];
			const newRotation = calculateRotation(spin_value);
			
			setRotation(newRotation);
			
			// Show result and celebration after animation completes
			setTimeout(() => {
				setCurrentResult({ value: spin_value, spin_number });
				setShowCelebration(true);
				setIsSpinning(false);
				
				// Update spin status
				setSpinStatus(prev => ({
					...prev,
					spin_count: spin_number,
					status: status,
					can_spin: can_spin_again,
					can_choose: can_choose,
					first_spin_value: spin_number === 1 ? spin_value : prev?.first_spin_value,
					second_spin_value: spin_number === 2 ? spin_value : prev?.second_spin_value,
				}));
			}, 4000); // Match animation duration
		} catch (err) {
			console.error('Error recording spin:', err);
			setError(err.response?.data?.message || t('spinWheel.errorSpinning', 'Error recording spin. Please try again.'));
			setIsSpinning(false);
		}
	};

	const handleChooseFinalValue = async (chosenValue) => {
		try {
			setError(null);
			const response = await axios.post('/api/method/landing.resk_landing.api.spin_wheel.choose_final_value', {
				chosen_value: chosenValue
			}, {
				headers: {
					'X-Frappe-CSRF-Token': window.csrf_token
				}
			});
			
			// Refresh spin status
			await fetchSpinStatus();
			setShowCelebration(false);
		} catch (err) {
			console.error('Error choosing final value:', err);
			setError(err.response?.data?.message || t('spinWheel.errorChoosing', 'Error choosing final value. Please try again.'));
		}
	};

	// Generate SVG path for segment
	const getSegmentPath = (startAngle, endAngle, radius = 200) => {
		const startRad = (startAngle * Math.PI) / 180;
		const endRad = (endAngle * Math.PI) / 180;
		
		const x1 = 200 + radius * Math.cos(startRad);
		const y1 = 200 + radius * Math.sin(startRad);
		const x2 = 200 + radius * Math.cos(endRad);
		const y2 = 200 + radius * Math.sin(endRad);
		
		const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
		
		return `M 200 200 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
	};

	// Get text position for segment
	const getTextPosition = (startAngle, endAngle, radius = 150) => {
		const centerAngle = (startAngle + endAngle) / 2;
		const rad = (centerAngle * Math.PI) / 180;
		const x = 200 + radius * Math.cos(rad);
		const y = 200 + radius * Math.sin(rad);
		return { x, y, angle: centerAngle };
	};

	// Color palette based on value - cheerful colors
	const getColorForValue = (value) => {
		switch(value) {
			case 10:
				return '#FF6B6B'; // Red/Pink
			case 25:
				return '#4ECDC4'; // Teal
			case 50:
				return '#FFD93D'; // Yellow/Gold
			case 100:
				return '#6BCF7F'; // Green
			default:
				return '#95A5A6';
		}
	};

	// Get celebration icon and message based on value
	const getCelebrationData = (value) => {
		switch(value) {
			case 10:
				return {
					icon: <HiEmojiHappy className="w-full h-full" />,
					message: t('spinWheel.win10', 'Great! You won 10 points!'),
					color: 'from-red-400 to-pink-500',
				};
			case 25:
				return {
					icon: <HiSparkles className="w-full h-full" />,
					message: t('spinWheel.win25', 'Awesome! You won 25 points!'),
					color: 'from-teal-400 to-cyan-500',
				};
			case 50:
				return {
					icon: <FaTrophy className="w-full h-full" />,
					message: t('spinWheel.win50', 'Fantastic! You won 50 points!'),
					color: 'from-yellow-400 to-orange-500',
				};
			case 100:
				return {
					icon: <HiStar className="w-full h-full" />,
					message: t('spinWheel.win100', 'Amazing! You won 100 points!'),
					color: 'from-green-400 to-emerald-500',
				};
			default:
				return {
					icon: <HiGift className="w-full h-full" />,
					message: t('spinWheel.win', 'Congratulations!'),
					color: 'from-blue-400 to-purple-500',
				};
		}
	};

	// Calculate total percentage
	const totalPercentage = Object.values(percentages).reduce((sum, val) => sum + val, 0);

	// Show loading state
	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center p-8">
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
					className="text-4xl mb-4"
				>
					<HiSparkles />
				</motion.div>
				<p className="text-gray-600 dark:text-gray-400 font-['Inter']">
					{t('spinWheel.loading', 'Loading...')}
				</p>
			</div>
		);
	}

	// Show error state
	if (error && !spinStatus) {
		return (
			<div className="flex flex-col items-center justify-center p-8">
				<p className="text-red-500 font-['Inter'] mb-4">{error}</p>
				<button
					onClick={fetchSpinStatus}
					className="px-4 py-2 bg-mysecondary text-white rounded-lg font-['Inter']"
				>
					{t('spinWheel.retry', 'Retry')}
				</button>
			</div>
		);
	}

	// If completed, show final result only
	if (spinStatus?.status === 'Completed' && spinStatus?.final_value) {
		return (
			<div className="flex flex-col gap-4 sm:gap-6 md:gap-8 p-3 sm:p-4 md:p-8 max-w-4xl mx-auto">
				<div className="flex flex-col items-center gap-4 sm:gap-6">
					<div className="text-center px-2">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-mytextcolor dark:text-gray-100 font-['Poppins'] mb-2">
							{t('spinWheel.completed', 'Spin Wheel Completed!')}
						</h2>
						<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-['Inter']">
							{t('spinWheel.completedMessage', 'You have completed your spins. Here is your final result:')}
						</p>
					</div>

					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ type: 'spring', stiffness: 200 }}
						className="w-full max-w-md px-2"
					>
						<div className={`bg-gradient-to-br ${getCelebrationData(spinStatus.final_value).color} rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 text-center relative overflow-hidden`}>
							<div className="relative z-10">
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: [0, 1.2, 1] }}
									transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
									className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4 text-white flex items-center justify-center"
								>
									{getCelebrationData(spinStatus.final_value).icon}
								</motion.div>
								
								<motion.h3
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3 }}
									className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 font-['Poppins'] px-2"
								>
									{t('spinWheel.finalResult', 'Your Final Result')}
								</motion.h3>
								
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.4 }}
									className="mt-3 sm:mt-4 inline-block bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3"
								>
									<div className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-1 font-['Poppins']">
										{spinStatus.final_value}%
									</div>
								</motion.div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		);
	}

	// Show choice UI if user needs to choose between two values
	if (spinStatus?.can_choose && spinStatus?.first_spin_value && spinStatus?.second_spin_value) {
		return (
			<div className="flex flex-col gap-4 sm:gap-6 md:gap-8 p-3 sm:p-4 md:p-8 max-w-4xl mx-auto">
				<div className="flex flex-col items-center gap-4 sm:gap-6">
					<div className="text-center px-2">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-mytextcolor dark:text-gray-100 font-['Poppins'] mb-2">
							{t('spinWheel.chooseValue', 'Choose Your Final Value!')}
						</h2>
						<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-['Inter']">
							{t('spinWheel.chooseMessage', 'You have completed both spins! Please choose one of your results as your final value.')}
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl px-2">
						{[
							{ value: spinStatus.first_spin_value, label: t('spinWheel.firstSpin', 'First Spin') },
							{ value: spinStatus.second_spin_value, label: t('spinWheel.secondSpin', 'Second Spin') }
						].map((option, index) => (
							<motion.button
								key={index}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => handleChooseFinalValue(option.value)}
								className={`bg-gradient-to-br ${getCelebrationData(option.value).color} rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 text-center cursor-pointer`}
							>
								<div className="w-12 h-12 sm:w-16 sm:h-16 mb-2 text-white flex items-center justify-center mx-auto">
									{getCelebrationData(option.value).icon}
								</div>
								<div className="text-sm sm:text-base text-white/90 font-['Inter'] mb-3">{option.label}</div>
								<div className="text-4xl sm:text-5xl font-black text-white font-['Poppins'] mb-1">
									{option.value}%
								</div>
							</motion.button>
						))}
					</div>

					{error && (
						<div className="text-red-500 text-sm font-['Inter']">{error}</div>
					)}
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 sm:gap-6 md:gap-8 p-3 sm:p-4 md:p-8 max-w-4xl mx-auto">
			<div className="flex flex-col items-center gap-4 sm:gap-6">
				{/* Header */}
				<div className="text-center px-2">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-mytextcolor dark:text-gray-100 font-['Poppins'] mb-2">
						{t('spinWheel.title', 'Spin & Win Vouchers!')}
					</h2>
					<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-['Inter']">
						{t('spinWheel.subtitle', 'Spin the wheel and win amazing vouchers!')}
					</p>
					{spinStatus?.spin_count > 0 && (
						<p className="text-sm text-mysecondary dark:text-mysecondary font-['Inter'] mt-2">
							{spinStatus.spin_count === 1 
								? t('spinWheel.oneSpinDone', 'You have completed 1 spin. You can spin once more!')
								: t('spinWheel.twoSpinsDone', 'You have completed both spins!')
							}
						</p>
					)}
				</div>
				
				<div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] aspect-square my-2 sm:my-4 md:my-8 mx-auto px-2">
					{/* Indicator */}
					<div 
						className="absolute -top-2 sm:-top-2.5 left-1/2 -translate-x-1/2 z-10"
						style={{
							width: 0,
							height: 0,
							borderLeft: 'clamp(12px, 3vw, 20px) solid transparent',
							borderRight: 'clamp(12px, 3vw, 20px) solid transparent',
							borderTop: `clamp(20px, 5vw, 35px) solid ${isDarkMode ? '#1A1D4C' : '#1A1D4C'}`,
							filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
						}}
					/>
					
					{/* Wheel */}
					<motion.div
						ref={wheelRef}
						className="w-full h-full rounded-full shadow-2xl dark:shadow-xl dark:shadow-black/30"
						animate={{ rotate: rotation }}
						transition={{ 
							duration: 4, 
							ease: [0.17, 0.67, 0.83, 0.67] // Ease out for natural deceleration
						}}
					>
						<svg 
							width="100%" 
							height="100%" 
							viewBox="0 0 400 400" 
							className="rounded-full w-full h-full"
							preserveAspectRatio="xMidYMid meet"
						>
							{segmentAngles.map((seg, index) => {
								const path = getSegmentPath(seg.startAngle, seg.endAngle);
								const textPos = getTextPosition(seg.startAngle, seg.endAngle);
								const color = getColorForValue(seg.value);
								
								return (
									<g key={seg.id}>
										<path
											d={path}
											fill={color}
											stroke={isDarkMode ? '#1e293b' : '#fff'}
											strokeWidth="3"
											opacity="0.9"
										/>
										<text
											x={textPos.x}
											y={textPos.y}
											textAnchor="middle"
											dominantBaseline="middle"
											fill="#fff"
											fontSize="clamp(14px, 4vw, 20px)"
											fontWeight="bold"
											transform={`rotate(${textPos.angle}, ${textPos.x}, ${textPos.y})`}
											style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}
										>
											{seg.value}%
										</text>
									</g>
								);
							})}
						</svg>
					</motion.div>
				</div>

				{/* Controls */}
				<div className="flex flex-col items-center gap-4 sm:gap-6 w-full px-2">
					{error && (
						<div className="text-red-500 text-sm font-['Inter'] bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
							{error}
						</div>
					)}
					
					<motion.button
						onClick={handleSpin}
						disabled={isSpinning || !spinStatus?.can_spin || totalPercentage !== 100}
						whileHover={!isSpinning && spinStatus?.can_spin && totalPercentage === 100 ? { scale: 1.05 } : {}}
						whileTap={!isSpinning && spinStatus?.can_spin && totalPercentage === 100 ? { scale: 0.95 } : {}}
						className={`
							bg-gradient-to-r from-resk-primary to-resk-secondary 
							text-white border-none px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-semibold font-['Inter']
							rounded-xl cursor-pointer transition-all duration-300 
							shadow-lg shadow-mysecondary/30
							w-full sm:w-auto sm:min-w-[200px]
							${isSpinning || !spinStatus?.can_spin ? 'opacity-70 cursor-not-allowed' : ''}
							${totalPercentage !== 100 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:shadow-mysecondary/40'}
							disabled:opacity-60 disabled:cursor-not-allowed
						`}
					>
						{isSpinning ? (
							<span className="flex items-center gap-2">
								<motion.span
									animate={{ rotate: 360 }}
									transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
								>
									<HiSparkles className="w-5 h-5" />
								</motion.span>
								{t('spinWheel.spinning', 'Spinning...')}
							</span>
						) : !spinStatus?.can_spin ? (
							<span className="flex items-center gap-2">
								<HiCheckCircle className="w-5 h-5" />
								{t('spinWheel.completed', 'Completed')}
							</span>
						) : (
							<span className="flex items-center gap-2">
								<HiGift className="w-5 h-5" />
								{t('spinWheel.spin', 'Spin & Win!')}
							</span>
						)}
					</motion.button>
					
					{/* Celebration Result */}
					<AnimatePresence>
						{currentResult && showCelebration && (
							<motion.div
								initial={{ opacity: 0, scale: 0.5, y: 50 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.5 }}
								transition={{ 
									type: 'spring',
									stiffness: 200,
									damping: 15
								}}
								className="w-full max-w-md px-2"
							>
								<div className={`bg-gradient-to-br ${getCelebrationData(currentResult.value).color} rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 text-center relative overflow-hidden`}>
									{/* Confetti effect */}
									<motion.div
										className="absolute inset-0"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
									>
										{[...Array(20)].map((_, i) => (
											<motion.div
												key={i}
												className="absolute w-2 h-2 bg-white rounded-full"
												initial={{
													x: '50%',
													y: '50%',
													opacity: 1,
												}}
												animate={{
													x: `${50 + (Math.random() - 0.5) * 100}%`,
													y: `${50 + (Math.random() - 0.5) * 100}%`,
													opacity: 0,
												}}
												transition={{
													duration: 2,
													delay: i * 0.1,
												}}
											/>
										))}
									</motion.div>
									
									<div className="relative z-10">
										<motion.div
											initial={{ scale: 0 }}
											animate={{ scale: [0, 1.2, 1] }}
											transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
											className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4 text-white flex items-center justify-center mx-auto"
										>
											{getCelebrationData(currentResult.value).icon}
										</motion.div>
										
										<motion.h3
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.3 }}
											className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 font-['Poppins'] px-2"
										>
											{getCelebrationData(currentResult.value).message}
										</motion.h3>
										
										<motion.div
											initial={{ opacity: 0, scale: 0.8 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{ delay: 0.4 }}
											className="mt-3 sm:mt-4 inline-block bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3"
										>
											<div className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-1 font-['Poppins']">
												{currentResult.value}%
											</div>
										</motion.div>
										
										{currentResult.spin_number === 1 && (
											<motion.div
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.5 }}
												className="mt-4 flex items-center justify-center gap-2 text-white/90 font-['Inter']"
											>
												<HiSparkles className="w-5 h-5" />
												<span>{t('spinWheel.spinAgain', 'Spin again for another chance to get a better result! You have one more spin remaining.')}</span>
											</motion.div>
										)}
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
