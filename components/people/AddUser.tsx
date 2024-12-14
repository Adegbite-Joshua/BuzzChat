type UserProps = {
  name: string;
  details: string;
  imageUrl: string;
  onAddFriend: () => void;
};

export default function AddUser({ name, details, imageUrl, onAddFriend }: UserProps) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg w-full max-w-sm my-1">
      <div className="flex items-center gap-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{details}</p>
          <p className="text-sm text-gray-500">From: {details}</p>
        </div>
      </div>
      <div className="flex">
        <button onClick={onAddFriend} className="bg-blue-600 text-white px-4 py-2 ms-auto rounded-md hover:bg-blue-700">
          Add Friend
        </button>
      </div>
    </div>

  );
}
