type UserProps = {
    name: string;
    details: string;
    imageUrl: string;
    onAddFriend: () => void;
  };
  
  export default function AddedUser({ name, details, imageUrl, onAddFriend }: UserProps) {
    return (
      <div className="flex items-center gap-4 bg-white shadow-md p-4 rounded-lg w-full max-w-sm">
        <img
          src={imageUrl}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{details}</p>
        </div>
        <button
          onClick={onAddFriend}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Friend
        </button>
      </div>
    );
  }
  