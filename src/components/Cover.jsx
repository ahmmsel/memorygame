import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

// cover component for card
function Cover({ onClick, className }) {
  return (
    <div
      className={`w-20 rounded-full border-neutral-700 p-2 ${className}`}
      rolue="button"
      onClick={onClick}>
      <QuestionMarkCircleIcon />
    </div>
  );
}

export default Cover;
