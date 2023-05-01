interface TextAreaType {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({ name, value, onChange }: TextAreaType) => {
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      event.target.style.height = `${event.target.scrollHeight}px`;
    }
  };

  return (
    <div className="flex flex-col">
      <textarea
        className="form-input  rounded-lg px-3 py-2 resize-none h-auto  dark:bg-gray-700"
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        rows={7}
      />
    </div>
  );
};

export default TextArea;
