import * as msTeams from "@microsoft/teams-js";
export default function Home() {
    console.log(msTeams.shareDeepLinkHelper())
  return <div className="Home">Hello From Home</div>;
}
