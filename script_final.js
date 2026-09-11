(async () => {
    console.clear();
    console.log("%c[Buscando Unfollowers...] Empezando el proceso...", "color: #007aff; font-size: 16px;");

    const getCookie = (name) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : null;
    };
    
    const userId = getCookie("ds_user_id");
    if (!userId) {
        console.error("❌ No se encontró el ID de usuario. Asegúrate de estar logueado.");
        return;
    }

    const headers = {
        'x-ig-app-id': '936619743392459', 
        'Accept': '*/*'
    };

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    const fetchList = async (type) => {
        let users = [];
        let maxId = '';
        let hasNext = true;
        let page = 1;

        while (hasNext) {
            console.log(`⏳ Obteniendo ${type}... (Página ${page}, Encontrados: ${users.length})`);
            
            const url = `https://www.instagram.com/api/v1/friendships/${userId}/${type}/?count=100${maxId ? '&max_id=' + maxId : ''}`;
            const res = await fetch(url, { headers });
            
            if (!res.ok) {
                console.error(`❌ Error al obtener ${type}. (Código: ${res.status}). ¡Es probable que Instagram te haya limitado temporalmente! Intenta más tarde.`);
                break;
            }
            
            const data = await res.json();
            
            if (data.users && data.users.length > 0) {
                users = users.concat(data.users);
            }

            hasNext = data.next_max_id ? true : false;
            maxId = data.next_max_id;
            page++;

            if (hasNext) {
                const delay = Math.floor(Math.random() * 2000) + 1500;
                await sleep(delay); 
            }
        }
        return users;
    };

    try {
        console.log("➡️ Paso 1: Obteniendo a quiénes sigues...");
        const following = await fetchList('following');
        
        console.log("➡️ Paso 2: Obteniendo quiénes te siguen...");
        const followers = await fetchList('followers');

        console.log("🔍 Comparando listas...");

        const followersIds = new Set(followers.map(u => u.pk || u.id));
        const ratas = following.filter(u => !followersIds.has(u.pk || u.id));

        console.log("%c=====================================", "color: red; font-size: 16px;");
        console.log(`✅ ¡LISTO! Sigues a ${following.length} personas. Te siguen ${followers.length} personas.`);
        console.log(`🚨 Hay ${ratas.length} RATAS que NO te siguen de vuelta.`);
        console.log("%c=====================================", "color: red; font-size: 16px;");
        
        ratas.forEach((u, i) => {
            console.log(`${i+1}. @${u.username} - https://www.instagram.com/${u.username}/`);
        });

    } catch (e) {
        console.error("❌ Error inesperado:", e);
    }
})();
