import { cn } from "@/lib/utils"
import React, { cloneElement, forwardRef, useEffect, type ReactElement } from "react"

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactElement[]
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
      {props.children?.map((child, index) => {
        const hasChildrenProp = 'children' in child.props;
        if (!hasChildrenProp) return (
          <div
            className={cn("h-4 w-4 cursor-pointer rounded-full bg-neutral",
              index === activeStep && "bg-success-foreground",
              index < activeStep && "bg-success"
            )}
          />
        )
        return cloneElement(child, {
          className: cn("flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral text-neutral-foreground",
            index === activeStep && "border border-success bg-success-foreground text-success",
            index < activeStep && "bg-success text-background",
          ),
          key: index
        })
      })}
    </section>
  )
})
Stepper.displayName = "Stepper"

const Step = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center", className)}
      {...props}
    />
  )
})
Step.displayName = "Step"

export { Step, Stepper }

