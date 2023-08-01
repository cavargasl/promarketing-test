import { cn } from "@/lib/utils"
import { forwardRef, useEffect } from "react"

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[]
  activeStep: number
  isLastStep: (value: boolean) => void
  isFirstStep: (value: boolean) => void
}
const Stepper = forwardRef<
  HTMLDivElement,
  StepperProps
>(({ className, activeStep, isLastStep, isFirstStep, ...props }, ref) => {

  useEffect(() => {
    isLastStep(activeStep === props.children.length - 1)
    isFirstStep(activeStep === 0)
  }, [activeStep, isLastStep, isFirstStep, props.children.length])

  return (
    <section
      ref={ref}
      className={cn("relative flex w-full items-center justify-between", className)}
      {...props}
    >
      {props.children?.map((child, index) => (
        <div key={index} className="flex items-center">
          <div
            className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-gray-200",
              index === activeStep ? "bg-success-foreground" : "bg-gray-200"
            )}>
            {child}
          </div>
          {index !== props.children.length - 1 && (
            <div className="h-px flex-1 bg-gray-200" />
          )}
        </div>
      ))}
    </section>
  )
})
Stepper.displayName = "Stepper"

export { Stepper }
