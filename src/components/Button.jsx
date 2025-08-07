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
    other = "bg-gray-400 hover:bg-gray-300 text-black";
  } else if (variant == "danger") {
    other = "bg-red-500 hover:bg-red-400 text-white";
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
