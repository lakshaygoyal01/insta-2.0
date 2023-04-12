import { faker } from "@faker-js/faker";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Story from "./Story";

function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  const { data: session}: { data: any }  = useSession();

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className=" relative flex space-x-2 p-6 bg-white mt-8 border-gray-500 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black ">
      {/* <img
        src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png"
        className=" h-14 w-14 border-2 border-gray-50 rounded-full object-contain"
      />
      <PlusCircleIcon className="absolute h-5 bg-white text-blue-400 top-[62px] left-[46px] rounded-full " />
      <p className="absolute top-20 left-3 w-15 text-xs">Your Story</p> */}
      {session && (
        <>
          <Story
            img={session.user.image}
            username={session.user.username}
          ></Story>
          {/* <PlusCircleIcon className="absolute h-5 bg-white text-blue-400 top-[62px] left-[46px] rounded-full " /> */}
        </>
      )}

      {suggestions.map((profile) => (
        <Story
          key={profile.uuid}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
      {/* Story */}
      {/* Story */}
      {/* Story */}
      {/* Story */}
      {/* Story */}
    </div>
  );
}

export default Stories;
