import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HiKey, HiArrowLeft } from "react-icons/hi";
import { signupService } from "../../services/signup";

export default function OtpForm({ email, phone, fullName, password, onBack }) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState({ type: "", text: "" });
	const inputRefs = useRef([]);

	// Focus first input on mount
	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, []);

	const handleInputChange = useCallback(
		(index, value) => {
			// Only allow digits
			const digit = value.replace(/[^0-9]/g, "").slice(0, 1);
			
			setOtpDigits((prevDigits) => {
				const newOtpDigits = [...prevDigits];
				newOtpDigits[index] = digit;
				return newOtpDigits;
			});

			// Auto-focus next input if digit was entered
			if (digit && index < 5 && inputRefs.current[index + 1]) {
				setTimeout(() => {
					inputRefs.current[index + 1].focus();
				}, 0);
			}

			// Clear errors
			setErrors((prev) => {
				if (prev?.otpCode) {
					return { ...prev, otpCode: "" };
				}
				return prev;
			});
		},
		[]
	);

	const handleKeyDown = useCallback(
		(index, e) => {
			// Handle backspace
			if (e.key === "Backspace") {
				if (!otpDigits[index] && index > 0) {
					// If current field is empty, go to previous and clear it
					setOtpDigits((prevDigits) => {
						const newOtpDigits = [...prevDigits];
						newOtpDigits[index - 1] = "";
						return newOtpDigits;
					});
					inputRefs.current[index - 1].focus();
				} else {
					// Clear current field
					setOtpDigits((prevDigits) => {
						const newOtpDigits = [...prevDigits];
						newOtpDigits[index] = "";
						return newOtpDigits;
					});
				}
			}
			// Handle arrow keys
			else if (e.key === "ArrowLeft" && index > 0) {
				inputRefs.current[index - 1].focus();
			} else if (e.key === "ArrowRight" && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		},
		[otpDigits]
	);

	const handlePaste = useCallback(
		(e) => {
			e.preventDefault();
			const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
			
			if (pastedData.length > 0) {
				setOtpDigits((prevDigits) => {
					const newOtpDigits = [...prevDigits];
					for (let i = 0; i < 6; i++) {
						newOtpDigits[i] = pastedData[i] || "";
					}
					return newOtpDigits;
				});
				
				// Focus the next empty input or the last one
				const nextIndex = Math.min(pastedData.length, 5);
				setTimeout(() => {
					if (inputRefs.current[nextIndex]) {
						inputRefs.current[nextIndex].focus();
					}
				}, 0);
				
				// Clear errors
				setErrors((prev) => {
					if (prev?.otpCode) {
						return { ...prev, otpCode: "" };
					}
					return prev;
				});
			}
		},
		[]
	);

	const otpCode = otpDigits.join("");

	const validateForm = useCallback(() => {
		const newErrors = {};

		if (!otpCode?.trim()) {
			newErrors.otpCode = t("auth.otpRequired", "OTP code is required");
		} else if (otpCode.length < 6) {
			newErrors.otpCode = t("auth.otpLength", "OTP code must be 6 characters");
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [otpCode, t]);

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();

			if (!validateForm()) return;

			setIsLoading(true);
			setMessage({ type: "", text: "" });

			try {
				const response = await signupService.signUp({
					email,
					phone,
					full_name: fullName,
					password,
					otp_code: otpCode,
				});

				if (response?.data?.message?.status === "success") {
					setMessage({
						type: "success",
						text: t("auth.accountCreated", "Account created successfully!"),
					});

					setTimeout(() => {
						navigate("/portal/login", {
							state: {
								message: t(
									"auth.signupSuccess",
									"Account created successfully! Please login."
								),
							},
						});
					}, 2000);
				} else {
					throw new Error(
						response?.data?.message?.message ||
							t("auth.registrationFailed", "Registration failed. Please try again.")
					);
				}
			} catch (error) {
				const errorMessage =
					error?.response?.data?.message?.message ||
					error?.response?.data?.exc ||
					error?.message ||
					t("auth.registrationFailed", "Registration failed. Please try again.");

				setMessage({
					type: "error",
					text: errorMessage,
				});
			} finally {
				setIsLoading(false);
			}
		},
		[otpCode, email, phone, fullName, password, validateForm, t, navigate]
	);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
	};

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="w-full max-w-md"
			dir="ltr"
			style={{ direction: 'ltr' }}
		>
			<motion.div variants={itemVariants} className="text-center mb-8">
				<h1 className="text-3xl sm:text-4xl font-bold text-white font-['Poppins'] mb-2">
					{t("auth.verifyOtp", "Verify OTP")}
				</h1>
				<p className="text-gray-200 sm:text-gray-300 font-['Inter'] text-sm sm:text-base">
					{t(
						"auth.otpDescription",
						"Please enter the OTP code sent to your email and phone"
					)}
				</p>
			</motion.div>

			<motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
				<div>
					<div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
						<HiKey className="w-5 h-5 text-white/80" />
						<p className="text-white/90 font-['Inter'] text-sm">
							{t("auth.enterOtp", "Enter 6-digit OTP")}
						</p>
					</div>
					
					<div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
						{otpDigits.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type="text"
								inputMode="numeric"
								maxLength={1}
								value={digit}
								onChange={(e) => handleInputChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								onPaste={index === 0 ? handlePaste : undefined}
								autoComplete="off"
								className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl sm:text-3xl font-bold font-['Inter'] rounded-xl border-2 transition-all focus:outline-none focus:ring-2 ${
									errors.otpCode
										? "border-red-500 focus:border-red-500 focus:ring-red-500/50 bg-red-50 dark:bg-red-900/20"
										: digit
										? "border-mysecondary focus:border-mysecondary focus:ring-mysecondary/50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
										: "border-white/30 focus:border-mysecondary focus:ring-mysecondary/50 bg-white/95 backdrop-blur-sm text-gray-900"
								}`}
								style={{ fontWeight: 700 }}
							/>
						))}
					</div>
					
					{errors.otpCode && (
						<p className="mt-2 text-sm text-red-200 font-['Inter'] text-center">{errors.otpCode}</p>
					)}
					
					<p className="text-white/70 font-['Inter'] text-xs sm:text-sm text-center mt-4">
						{t("auth.otpSentTo", "OTP sent to")} {email || phone}
					</p>
				</div>

				{message.text && (
					<div
						className={`p-3 rounded-lg text-sm ${
							message.type === "success"
								? "bg-green-500/20 text-green-100 border border-green-300/50"
								: "bg-red-500/20 text-red-100 border border-red-300/50"
						} backdrop-blur-sm font-['Inter']`}
					>
						{message.text}
					</div>
				)}

				<motion.button
					type="submit"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					disabled={isLoading}
					className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-resk-primary to-resk-secondary text-white rounded-xl font-semibold font-['Inter'] hover:shadow-lg hover:shadow-resk-secondary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
				>
					{isLoading
						? t("auth.verifying", "Verifying...")
						: t("auth.verifyCreateAccount", "Verify & Create Account")}
				</motion.button>

				<motion.button
					type="button"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={onBack}
					disabled={isLoading}
					className="w-full py-3.5 sm:py-4 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold font-['Inter'] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base border border-white/30 flex items-center justify-center gap-2"
				>
					<HiArrowLeft className="w-5 h-5" />
					{t("auth.back", "Back")}
				</motion.button>
			</motion.form>
		</motion.div>
	);
}

