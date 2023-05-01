interface TextAreaType {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TextArea = ({ name, value, onChange, onSubmit }: TextAreaType) => {
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit?.(event);
    }
  };

  return (
    <div className="flex flex-col">
      <textarea
        className="form-input rounded-lg px-3 py-2 resize-none h-auto  dark:bg-gray-600 bg-gray-600"
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        rows={3}
      />
    </div>
  );
};

export default TextArea;
