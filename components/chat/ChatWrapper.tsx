import { defineQuery } from "next-sanity";
import Chat from "@/components/chat/Chat";
import { sanityFetch } from "@/sanity/lib/live";

const CHAT_PROFILE_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    firstName,
    lastName,
    headline,
    shortBio,
    email,
    phone,
    location,
    availability,
    socialLinks,
    yearsOfExperience,
    profileImage
  }`);

async function ChatWrapper() {
  const { data: profile } = await sanityFetch({ query: CHAT_PROFILE_QUERY });

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 min-h-0">
        <Chat profile={profile} />
      </div>
    </div>
  );
}

export default ChatWrapper;
