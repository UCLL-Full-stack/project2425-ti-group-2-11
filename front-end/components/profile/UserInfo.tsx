import { User } from "types/types";

export default function UserInfo({ user }: { user: User }) {
  return (
    <div className="mt-4">
      <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
      <p className="text-gray-600"><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      <p className="text-gray-600"><strong>Last login:</strong> {new Date(user.lastLogin).toLocaleDateString()}</p>
      {user.bio && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Bio</h2>
          <p className="text-gray-600">{user.bio}</p>
        </div>
      )}
    </div>
  )
}

