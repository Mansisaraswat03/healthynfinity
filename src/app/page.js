import Logout from "@/components/logout";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col text-2xl justify-center items-center md:mt-20">
      To access logging system visit{" "}
      <Link href="/logs" className="text-blue-500">
        logs
      </Link>
      Create account visit{" "}
      <Link href="/signup" className="text-blue-500">
        signup
      </Link>
      Already have an account{" "}
      <Link href="/login" className="text-blue-500">
        login
      </Link>
      <Logout />
      <p className="mt-10 text-4xl font-bold mx-4">
        PS: I have not payed much attention to UI of the project .If you want me
        to make UI user interactive and attractive I can do that .This project
        shows that I know concepts of authentication and authorization and can
        use it with mernstack to deliver the project.I have not put admin based
        restriction on logs route so that you can access it with user your
        normal user credentials after signup.I have not created redux store or
        context to store filter and pagination values but i have knowledge of
        all that too I can explain all those concepts in further meeting...
      </p>
    </div>
  );
}
