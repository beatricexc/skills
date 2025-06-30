
export type SkillInfoProps = {
    title: string;
    info: {text: string}[]
}
export default function SkillInfo({title, info}: SkillInfoProps) {
    return (
        <div>
            <h3>{title}</h3>
            {info.map((infoEl, index) => {
                return (
                    <p key={index} className="text-base leading-relaxed mb-4">
                        {infoEl.text}
                    </p>
                )
            })}
        </div>
    );
}
