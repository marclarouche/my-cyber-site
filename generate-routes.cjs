const fs = require('fs');
const path = require('path');

// 1. Point this to your src folder
const srcDir = path.resolve(__dirname, 'src');

// 2. All folders containing page components
const foldersToScan = [
  'pages',
  'consultations',
  'policy-generators',
  'security-center',
  'tools'
];

function getRoutes(dir, baseRoute = '') {
  let routes = [];
  
  // Safety check: ensure directory exists
  if (!fs.existsSync(dir)) return routes;

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      routes = routes.concat(getRoutes(filePath, `${baseRoute}/${file}`));
    } else {
      // 1. Remove file extension
      let routeName = file.replace(/\.(jsx|tsx|js|ts)$/, '');
      
      // 2. JUNK FILTER: Ignore backup, bad, or temporary files
      const isJunk = /BKUP|BAD|OLD|Recent|HomePage\d/i.test(routeName);
      if (isJunk) return;

      // 3. CLEAN ROUTING: Handle index and homepage as root '/'
      const isRoot = routeName.toLowerCase() === 'index' || routeName.toLowerCase() === 'homepage';
      
      if (isRoot) {
        routes.push(baseRoute === '' ? '/' : baseRoute.toLowerCase());
      } else {
        // 4. CASE SENSITIVITY: Force lowercase for Netlify/Linux compatibility
        routes.push(`${baseRoute}/${routeName}`.toLowerCase());
      }
    }
  });

  // Remove duplicates (e.g., if you have index.jsx and homepage.jsx)
  return [...new Set(routes)];
}

// 3. Scan all folders and combine routes
let allRoutes = ['/'];

foldersToScan.forEach((folder) => {
  const folderPath = path.join(srcDir, folder);
  const routes = getRoutes(folderPath);
  allRoutes = allRoutes.concat(routes);
});

// 4. Remove duplicates across all folders
allRoutes = [...new Set(allRoutes)];

console.log('Final Cleaned Routes:', allRoutes);

// Use this for .cjs files
module.exports = allRoutes;
