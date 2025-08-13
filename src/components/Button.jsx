export default function Button({
  onClick,
  text,
  variant = "default",
  disabled = false,
  type = "button",
}) {
  const def = "rounded-sm p-2 w-full hover:cursor-pointer ";
  var other;

  if (variant == "default") {
    other = "bg-brand hover:bg-brand-light text-white";
  } else if (variant == "dark") {
    other = "bg-gray-500 hover:bg-[#858A98] text-white";
  } else if (variant == "danger") {
    other = "bg-red-500 hover:bg-[#F15B5B] text-white";
  }
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={def + other}
    >
      {text}
    </button>
  );
}
