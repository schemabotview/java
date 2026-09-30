import type { Scene } from '@graphlearning/flow'

// §2/§4/§5 — the three shapes, one card each pass. Kept as a single card so that the reader sees
// the same operations across List, Set and Map and the differences stand out by alignment. The
// implementation choice per interface is the part that actually varies in practice.
export const listSetMap: Scene = {
  id: 'list-set-map',
  title: 'List · Set · Map — and which implementation',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Shapes.java',
      label: [
        '// LIST — ordered, indexed, duplicates allowed',
        'List<Order> os = new ArrayList<>();   // 99% of the time',
        'os.add(o); os.get(0); os.set(0, o2); os.remove(0);',
        'os.indexOf(o);  os.subList(1, 3);     // a LIVE view!',
        '// LinkedList: only for a genuine head/tail queue. Use Deque.',
        '',
        '// SET — no duplicates. "Duplicate" means equals + hashCode.',
        'Set<String> ids = new HashSet<>();    // O(1), no order',
        'new LinkedHashSet<>();                // O(1), INSERTION order',
        'new TreeSet<>(cmp);                   // O(log n), SORTED order',
        'ids.add("A-1");   // returns false if it was already there',
        '',
        '// MAP — key to value. Not a Collection.',
        'Map<String, Order> byId = new HashMap<>();',
        'byId.put(id, o);  byId.get(id);   // get returns null if absent',
        'byId.getOrDefault(id, EMPTY);',
        'byId.computeIfAbsent(id, k -> new ArrayList<>()).add(line);',
        'byId.merge(id, 1, Integer::sum);      // count in one line',
        '',
        '// HashMap allows one null key; TreeMap and Hashtable do not.',
        '// LinkedHashMap(cap, load, true) is access-ordered: an LRU',
        '// cache is that plus removeEldestEntry.',
      ].join('\n'),
    },
  ],
  edges: [],
}
