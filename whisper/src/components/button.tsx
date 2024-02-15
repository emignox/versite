function button(props: { value: string }) {
  return (
    <>
      <button
        value={props.value}
        className=" text-white  py-2 px-6 w-4/5  font-bold  rounded-2xl  text-xl  fillEffect"
        type="submit"
      >
        {props.value}
      </button>
    </>
  );
}

export default button;
