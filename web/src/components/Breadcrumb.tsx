import Link from 'next/link';

interface BreadcrumbContent {
  link: string;
  label: string;
}

interface BreadcrumbProps {
  content: BreadcrumbContent[];
}

const Breadcrumb = ({ content }: BreadcrumbProps) => {
  return (
    <div className='-mt-6 italic text-blue-600 transition-colors duration-300 ease-in-out'>
      {content.map((value, index) => {
        return (
          <div key={index} className='inline'>
            <Link href={value.link} scroll={false}>
              <a className='cursor-pointer font-bold hover:text-blue-800'>
                {value.label}
              </a>
            </Link>
            {index !== content.length - 1 && (
              <span className='mx-1'>{`>`}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
