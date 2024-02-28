export const formattedDate = (inputDate: string) => {
    const [day, month, year] = inputDate.split("-");
    return new Date(`${month}/${day}/${year}`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
};
