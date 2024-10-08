import DragComponent from "../Components/CreateNewAdmin/DragComponent";
import Button from "../Components/ui/Button";
export default function CreateNewAdmin() {
  const branch = ["Fayoum","Ismailia","Aswan","Fayoum","New Capital","Cairo University","Alexandria","cairo", "porsaid"];

  return (
    <div className="flex flex-col p-28 space-y-10 border border-main border-spacing-3 bg-main-light
    ">
      <h1 className=" text-center text-main text-2xl ">Create New Admin</h1>
      <div className="flex justify-between
      ">
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input type="text" className="grow" placeholder="admin name" />
        </label>
          <select className="select select-error w-full max-w-xs">
            <option disabled selected>
              What is admin branch
            </option>
            {branch.map((e) => {
              return <option className=" hover:bg-main" value={e}>{e}</option>;
            })}
          </select>
      </div>
      <div className="flex justify-around">
        <label className="input input-bordered flex items-center gap-2">
          Admin name
          <input type="text" className="grow" placeholder="admin@admin.com" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
     password:
          <input type="password" className="grow"  />
        </label>
      </div>
      <div className="w-full">
      <DragComponent />
    </div>
    <div className="w-full text-center">
        <Button text="create admin"/>
    </div>
    </div>
  );
}
