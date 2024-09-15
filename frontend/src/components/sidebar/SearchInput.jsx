import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};
	return (
		<form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
  <input 
    type="text" 
    placeholder="Search…" 
    className="input input-bordered rounded-full flex-grow min-w-0 md:min-w-[250px] lg:min-w-[300px]" 
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{ marginTop: 'env(safe-area-inset-top)' }} // adds padding to avoid overlap on iOS
  />
  <button type="submit" className="btn btn-circle bg-sky-500 text-white flex-shrink-0">
    <IoSearchSharp className="w-6 h-6 outline-none" />
  </button>
</form>



	);
};
export default SearchInput;
