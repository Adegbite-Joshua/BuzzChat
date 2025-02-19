import Link from "next/link";

type UserProps = {
  name: string;
  id: string;
  details: string;
  imageUrl: string;
  friends: [];
  selectUser?: () => void;

};

export default function Friend({ name, id, details, imageUrl, friends }: UserProps) {
  return (
    <div className="flex items-center my-1 gap-4 bg-white shadow-md p-4 rounded-lg w-full max-w-sm cursor-pointer">
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
        <p className="text-sm text-gray-500"><span className="font-semibold">{friends.length}</span> friends</p>
      </div>
    </div>
  );
}
