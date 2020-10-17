export function flatToHierarchy(flat: any[]): any[] {

    const roots: any[] = []; // things without parent
    const all: any = {};

    flat.forEach((item: any) => {
        all[item.id] = item;
    });

    // connect children to its parent, and split roots apart
    for (const key of Object.keys(all)) {
        const item = all[key];
        if (!item.parent) {
            roots.push(item);
        } else if (item.parent in all) {
            const p = all[item.parent];
            if (!('children' in p))
                p.children = [];
            p.children.push(item);
        }
    }

    // done!
    return roots;
}
