import Image from "next/image";

const BRAND: Record<string, string> = {
  Python: "python", JavaScript: "javascript", PyTorch: "pytorch", TensorFlow: "tensorflow",
  "scikit-learn": "scikitlearn", OpenCV: "opencv", FastAPI: "fastapi", Flask: "flask",
  Firebase: "firebase", Docker: "docker", "Git / GitHub": "github", AWS: "amazonwebservices",
};

export default function TechLogo({ name, symbol }: { name: string; symbol: string }) {
  return BRAND[name]
    ? <div className="inspector-logo"><Image src={`/logos/tech/${BRAND[name]}.svg`} width={110} height={110} alt={`${name} logo`} unoptimized /></div>
    : <span className="inspector-symbol" aria-hidden="true">{symbol}</span>;
}
