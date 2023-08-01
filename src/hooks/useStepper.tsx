import { useState } from "react";

export default function useStepper() {
  const [activeStep, setActiveStep] = useState(0)
  const [isLastStep, setIsLastStep] = useState(false)
  const [isFirstStep, setIsFirstStep] = useState(false)

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1)
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1)

  return { activeStep, isLastStep, isFirstStep, handleNext, handlePrev, setIsLastStep, setIsFirstStep }
}