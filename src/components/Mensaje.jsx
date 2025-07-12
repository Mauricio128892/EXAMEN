export default function Mensaje({ texto }) {
  return (
    <div className="bg-green-100 text-green-900 p-4 mb-4 rounded">
      <p>{texto}</p>
    </div>
  );
}
