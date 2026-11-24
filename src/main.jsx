import React, {useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route, NavLink, Link, useLocation} from 'react-router-dom';
import {products} from './products';
import './style.css';

const ETSY='https://www.etsy.com/shop/GLDigitalLab';
const logo='/sajjadhaiderltd-logo.png';

function Header(){
 const [query,setQuery]=useState('');
 const [menu,setMenu]=useState(false);
 const location=useLocation();
 const search=()=>{if(query.trim()) window.location.href='/shop?search='+encodeURIComponent(query.trim())};
 return <><div className="announcement">THOUGHTFUL PLANS. BEAUTIFULLY BUILT PROJECTS.</div><header className="header"><div className="header-inner">
  <Link className="brand" to="/"><img src={logo} alt="SajjadHaiderLtd logo"/></Link>
  <button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation">☰</button>
  <nav className={menu?'nav open':'nav'}>
   <NavLink to="/" onClick={()=>setMenu(false)}>Home</NavLink>
   <NavLink to="/shop" onClick={()=>setMenu(false)}>Shop All</NavLink>
   <NavLink to="/about" onClick={()=>setMenu(false)}>About</NavLink>
   <NavLink to="/faq" onClick={()=>setMenu(false)}>FAQs</NavLink>
   <a href={ETSY} target="_blank" rel="noreferrer">Contact on Etsy ↗</a>
  </nav>
  <form className="header-search" onSubmit={e=>{e.preventDefault();search()}}><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search plans..." aria-label="Search plans"/><button aria-label="Search">⌕</button></form>
 </div></header></>;
}
function Footer(){return <><section className="cta"><span className="eyebrow">YOUR NEXT BUILD STARTS HERE</span><h2>Ready to make it yourself?</h2><p>Choose a project, get your plan and bring your next woodworking idea to life.</p><Link className="btn wood-btn" to="/shop">Explore the collection</Link></section><footer className="footer"><div className="footer-inner">
 <div className="footer-brand"><Link to="/"><img src={logo} alt="SajjadHaiderLtd"/></Link><p>Thoughtful digital plans for practical woodworking projects, furniture builds and DIY ideas.</p></div>
 <div><h4>Explore</h4><div className="footer-links"><Link to="/shop">Shop All</Link><Link to="/about">About Us</Link><Link to="/faq">FAQs</Link></div></div>
 <div><h4>Customer Care</h4><div className="footer-links"><a href={ETSY} target="_blank" rel="noreferrer">Contact on Etsy ↗</a><a href={ETSY} target="_blank" rel="noreferrer">Digital Download Info ↗</a></div></div>
 </div><div className="footer-bottom"><span>© {new Date().getFullYear()} SajjadHaiderLtd. All rights reserved.</span><span>Woodworking Plans & Blueprints</span></div></footer></>}
function ProductCard({p}){return <article className="product-card"><a href={p.url} target="_blank" rel="noreferrer" aria-label={'View '+p.title+' on Etsy'}><div className="product-image"><img src={p.image} alt={p.title} loading="lazy"/></div></a><div className="product-info"><div className="product-title-row"><h3>{p.title}</h3><span className="price">{p.price}</span></div><p>DIGITAL DOWNLOAD</p></div></article>}
function ProductGrid({items}){return <div className="product-grid">{items.map((p,i)=><ProductCard key={p.url||i} p={p}/>)}</div>}
function Home(){
 const featured=products.slice(0,8);
 return <><main>
  <section className="hero"><div className="hero-copy"><span className="eyebrow">BUILD WITH CONFIDENCE</span><h1>Make something<br/>worth keeping.</h1><p>Discover thoughtfully designed woodworking plans with clear instructions, practical cut lists and detailed blueprints for your next project.</p><div className="hero-buttons"><Link className="btn" to="/shop">Explore plans</Link><Link className="btn btn-outline" to="/about">Our story</Link></div></div><div className="hero-image" role="img" aria-label="Warm modern living room with thoughtfully made furniture"/></section>
  <section className="approach section"><div className="approach-left"><span className="eyebrow">THE SajjadHaiderLtd APPROACH</span><h2>Good projects start<br/>with a <em>good plan.</em></h2></div><div className="approach-right"><p>Whether you're setting up your workshop or taking on your next furniture build, the right plan makes every step clearer. Explore digital guides created to help you measure, prepare and build with confidence.</p><Link className="text-link" to="/about">More about SajjadHaiderLtd&nbsp; →</Link></div></section>
  <section className="benefits"><div className="benefit"><span>⚒</span><h3>Made for makers</h3><p>Project ideas designed for practical DIY building.</p></div><div className="benefit"><span>⌁</span><h3>Plan with clarity</h3><p>Helpful layouts and measurements to guide your work.</p></div><div className="benefit"><span>◇</span><h3>Digital delivery</h3><p>Convenient downloadable plans, ready when you are.</p></div><div className="benefit"><span>♧</span><h3>Shop with confidence</h3><p>Browse securely through our Etsy storefront.</p></div></section>
  <section className="section featured"><div className="section-head align-left"><div><span className="eyebrow">A FEW IDEAS TO GET YOU STARTED</span><h2>Featured <em>plans</em></h2></div><Link className="text-link" to="/shop">View all 56 products&nbsp; →</Link></div><ProductGrid items={featured}/><div className="center-action"><Link className="btn" to="/shop">View more products&nbsp; →</Link></div></section>
  <section className="popular"><div className="section-head"><span className="eyebrow">THE WORKSHOP EDIT</span><h2>Popular woodworking plans</h2><p>Explore a selection of project ideas to inspire your next build. Product listings can be connected to your Etsy shop.</p></div></section>
  <section className="section about-preview"><div className="about-image"><img src={products[2].image} alt="Woodworking project plan inspiration" loading="lazy"/></div><div className="about-copy"><h2>Good projects start with a clear plan.</h2><p>We make it easier to turn an idea into something real. Explore practical digital woodworking plans designed to help makers plan their materials, understand each step and approach every project with confidence.</p><p>Whether you are building a piece for your home, garden or workshop, find a plan that helps you get started.</p><div className="about-points"><span>Practical project guides</span><span>Helpful cut lists</span><span>Digital PDF formats</span><span>Made for DIY makers</span></div><Link className="btn" to="/about">Find a project</Link></div></section>
 </main><Footer/></>
}
function Shop(){
 const params=new URLSearchParams(window.location.search);
 const [search,setSearch]=useState(params.get('search')||'');
 const [sort,setSort]=useState('featured');
 const filtered=useMemo(()=>{let a=products.filter(p=>p.title.toLowerCase().includes(search.toLowerCase()));if(sort==='az')a=[...a].sort((x,y)=>x.title.localeCompare(y.title));if(sort==='za')a=[...a].sort((x,y)=>y.title.localeCompare(x.title));return a},[search,sort]);
 return <><main className="inner-page"><div className="page-heading"><span className="eyebrow">THE COMPLETE COLLECTION</span><h1>Shop all <em>plans</em></h1><p>Browse practical woodworking plans and digital blueprints for your next project.</p></div><div className="shop-controls"><label className="shop-search">Search plans<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Try bench, shelf, vanity..."/></label><label>Sort by<select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="az">Name: A to Z</option><option value="za">Name: Z to A</option></select></label><span className="count">{filtered.length} of {products.length} products</span></div>{filtered.length?<ProductGrid items={filtered}/>:<p className="empty">No matching plans found. Try another search.</p>}</main><Footer/></>
}
function About(){return <><main className="inner-page"><div className="page-heading"><span className="eyebrow">THE SajjadHaiderLtd STORY</span><h1>Good projects start<br/>with a <em>good plan.</em></h1><p>Thoughtful digital plans for practical woodworking projects, furniture builds and DIY ideas.</p></div><section className="about-detail"><img src={products[2].image} alt="Woodworking project"/><div><h2>Make your next build clearer.</h2><p>At SajjadHaiderLtd, we believe a well-prepared plan makes every project easier to approach. Our digital woodworking guides are created for makers who want to turn ideas into useful, lasting pieces.</p><p>Explore project plans with helpful layouts, measurements and practical guidance. Whether you're planning a home project, a garden build or a workshop upgrade, start with a clear plan and build with confidence.</p><div className="about-points"><span>Practical project guides</span><span>Helpful cut lists</span><span>Digital PDF formats</span><span>Made for DIY makers</span></div><a className="btn" href={ETSY} target="_blank" rel="noreferrer">Visit Etsy Shop ↗</a></div></section></main><Footer/></>}
const faqs=[
 ['What will I receive after purchasing a plan?','Each listing is a digital woodworking plan. Please check the individual Etsy listing for the included files and project details.'],
 ['Are these physical products?','No. The listings are digital downloads; no physical furniture or finished item will be shipped.'],
 ['Where do I purchase the plans?','You can browse and purchase the plans through our Etsy shop.'],
 ['How do I access my digital download?','Etsy provides access to eligible digital files through your Etsy account after purchase. Check Etsy’s digital download instructions if you need help.'],
 ['Do the plans include measurements?','Plan details vary by listing. Review the individual product description and images on Etsy for the exact contents.'],
 ['Can I ask a question before purchasing?','Yes. Use the Contact on Etsy link and send us a message about the project you are interested in.'],
 ['Can I use the plans for my own DIY projects?','The plans are intended to guide your own woodworking build. Please review the usage terms shown on the relevant Etsy listing.'],
 ['What if I have trouble with my download?','Please contact us through Etsy with your order details so we can help direct you to the right support.']
];
function FAQ(){const [open,setOpen]=useState(0);return <><main className="inner-page faq-page"><div className="page-heading"><span className="eyebrow">A LITTLE MORE INFORMATION</span><h1>Frequently asked <em>questions</em></h1><p>Helpful answers about our woodworking plans and digital downloads.</p></div><div className="faq-list">{faqs.map(([q,a],i)=><div className="faq-item" key={q}><button onClick={()=>setOpen(open===i?-1:i)}><span>{q}</span><b>{open===i?'−':'+'}</b></button>{open===i&&<p>{a}</p>}</div>)}</div><div className="faq-contact"><h2>Still have a question?</h2><p>We’re happy to help. Send us a message through Etsy.</p><a className="btn" href={ETSY} target="_blank" rel="noreferrer">Contact on Etsy ↗</a></div></main><Footer/></>}
function App(){return <BrowserRouter><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/shop" element={<Shop/>}/><Route path="/about" element={<About/>}/><Route path="/faq" element={<FAQ/>}/><Route path="*" element={<Home/>}/></Routes></BrowserRouter>}
createRoot(document.getElementById('root')).render(<App/>);
