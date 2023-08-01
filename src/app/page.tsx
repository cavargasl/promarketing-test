import StepperCustomClass from "./components/StepperCustomClass";
import StepperDefault from "./components/StepperDefault";
import StepperWithContent from "./components/StepperWithContent";
import StepperWithIcon from "./components/StepperWithIcon";

export default function Home() {
  return (
    <main>
      <div className="container flex max-w-xl flex-col gap-16 py-4">
        <div>
          <h1 className="mb-4 text-center text-xl font-semibold">Stepper default</h1>
          <StepperDefault />
        </div>
        <div>
          <h1 className="mb-4 text-center text-xl font-semibold">Stepper with icons</h1>
          <StepperWithIcon />
        </div>
        <div>
          <h1 className="mb-4 text-center text-xl font-semibold">Stepper with content</h1>
          <StepperWithContent />
        </div>
        <div>
          <h1 className="mb-4 text-center text-xl font-semibold">Stepper with custom class, active and complete</h1>
          <StepperCustomClass />
        </div>
      </div>
    </main>
  )
}
