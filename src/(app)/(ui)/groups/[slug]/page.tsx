import GroupList from "../GroupList";
import GroupMemberList from "./GroupMemberList";

export default function Page({ params: { slug } }: { params: { slug: string } }) {
	if(slug === "blank") return <GroupList mode="empty"/>
	return <GroupMemberList slug={slug} />;
}
