import Link from "next/link";

type UserProps = {
  name: string;
  id: string;
  details: string;
  imageUrl: string;
  onAddFriend: () => void;
  isRequestSent: boolean;
  userHasSentFriendRequest: boolean;
  onAccept?: () => void;
  onDelete?: () => void;
};

export default function AddUser({ name, id, details, imageUrl, onAddFriend, isRequestSent, userHasSentFriendRequest, onAccept, onDelete }: UserProps) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg w-full max-w-sm my-1">
      <div className="flex items-center gap-4">
        <Link className="w-12 h-12" href={`/people/${id}`}>
          <img
            src={imageUrl}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          </Link>
          <div className="flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">{details}</p>
            <p className="text-sm text-gray-500">From: {details}</p>
          </div>
      </div>
      <div className="flex">
        {isRequestSent && !userHasSentFriendRequest && <div className="bg-orange-600 text-white px-4 py-2 ms-auto rounded-md">
          Pending
        </div>}
        {!isRequestSent && !userHasSentFriendRequest && <button onClick={onAddFriend} className="bg-blue-600 text-white px-4 py-2 ms-auto rounded-md hover:bg-blue-700">
          Add Friend
        </button>}
        {userHasSentFriendRequest && <div className="flex gap-2 justify-end">
          <button
            onClick={onAccept}
            className="bg-green-600 text-sm font-semibold text-white px-2 py-1 rounded-md hover:bg-green-700"
          >
            Accept
          </button>
          <button
            onClick={onDelete}
            className="bg-red-600 text-sm font-semibold text-white px-2 py-1 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>}
      </div>
    </div>

  );
}
