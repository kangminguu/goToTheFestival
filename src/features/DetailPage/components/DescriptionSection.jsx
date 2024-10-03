/* eslint-disable react/prop-types */
export default function DescriptionSection ({description}) {
  return (
    <div className="text-[14px]">
                {description.split("<br>").map((desc, i) => (
                    <p className="mt-[10px]" key={i}>{`${desc}`}</p>
                ))}
            </div>
  );
};
