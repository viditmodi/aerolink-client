export const formatName = (data) => {
  if (!data.first_name || !data.last_name) return "";
  let name = data.first_name + " ";
  if (data.middle_name) {
    name = name + data.middle_name + " ";
  }
  name = name + data.last_name;
  return name;
};

export const objectifyName = (name) => {
  name = name.split(/[ \t]+/);
  const first_name =
    name[0].slice(0, 1).toUpperCase() +
    name[0].slice(1, name[0].length).toLowerCase();
  let middle_name = name.slice(1, name.length - 1);

  if (middle_name) {
    const midName = middle_name.map((element) => {
      return (
        element.slice(0, 1).toUpperCase() +
        element.slice(1, element.length).toLowerCase()
      );
    });
    // console.log(midName);
    middle_name = midName.join(" ");
  }

  const last_name =
    name[name.length - 1].slice(0, 1).toUpperCase() +
    name[name.length - 1].slice(1, name[name.length - 1].length).toLowerCase();

  return { first_name, middle_name, last_name };
};
