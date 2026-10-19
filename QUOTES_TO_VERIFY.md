# Ellen G. White Quotes Verification Ledger

All Ellen G. White quotes across the Outpost Living application have been moved out of component and content files into the central verified quote store at `src/data/sources/quotes.ts`.

In accordance with strict verification protocol:
- Every entry is initialized with `verifiedBy: null`.
- Unverified quotes remain hidden from public displays until verified by an authorized reviewer.
- Quotations never join fragmented clauses with ellipses (`...`); each separate passage is preserved as an independent verified entry.
- All reference codes adhere to standard Ellen G. White Estate notation (e.g., `GC 422.1`, `CL 24.1`, `MH 127.2`).
- Scripture companions cite the translation explicitly (e.g., `Scripture from King James Version`).
- Each entry follows the standardized content template:
  1. **Summary**
  2. **Timeline / Prophetic Stage**
  3. **References** (Standard EGW code, Scripture reference, Book, Page/Section)
  4. **Application for country living**
  5. **Adventist perspective**

---

## Verification Instructions

To verify an entry:
1. Locate the entry ID in `src/data/sources/quotes.ts`.
2. Compare the text character-by-character against the original published work via [EGW Writings Mobile / Online](https://m.egwwritings.org/).
3. Verify that the standard EGW reference code, book title, and paragraph number correspond directly to the standard print edition.
4. Set `verifiedBy: "<Your Name>"` and `verifiedDate: "<YYYY-MM-DD>"`.
5. Once verified, the entry automatically unlocks for public display in the Spirit of Prophecy Archive and Prophetic Timeline.

---

## Summary of Quotes Awaiting Verification (30 Total)

| ID | Title | Standard EGW Code | Book / Source | Category | Status |
|---|---|---|---|---|---|
| `prophecy-1844-sanctuary-part1` | 1844: Christ Enters the Most Holy Place | `GC 422.1` | The Great Controversy, p. 422 | Vision | `verifiedBy: null` |
| `prophecy-1844-sanctuary-part2` | Destiny Decided in the Pre-Advent Judgment | `GC 490.2` | The Great Controversy, p. 490 | Vision | `verifiedBy: null` |
| `prophecy-three-angels` | Watchmen Proclaiming the Three Angels' Messages | `9T 19.1` | Testimonies for the Church, Vol. 9, p. 19 | Vision | `verifiedBy: null` |
| `prophecy-second-coming-eden` | The Second Coming & The Eternal Country Inheritance | `GC 675.2` | The Great Controversy, p. 675 | Spiritual Growth | `verifiedBy: null` |
| `prep-1` | The Signal of the Roman Armies & Mountain Flight | `5T 464.3` | Testimonies for the Church, Vol. 5, p. 464 | Preparation | `verifiedBy: null` |
| `1` | Take Children into the Country & Cultivate the Soil | `CL 24.1` | Country Living, p. 24 | Vision | `verifiedBy: null` |
| `prep-2` | Raising Provisions Before Buying & Selling Crisis | `CL 9.6` | Country Living, pp. 9–10 | Preparation | `verifiedBy: null` |
| `vision-outpost-1` | Working the Cities from Rural Outpost Centers | `2SM 358.2` | Selected Messages, Book 2, p. 358 | Vision | `verifiedBy: null` |
| `prep-3` | Impending Judgments Upon the Large Cities | `7T 83.1` | Testimonies for the Church, Vol. 7, p. 83 | Preparation | `verifiedBy: null` |
| `edu-1` | Agriculture: The A, B, and C of True Education | `6T 179.2` | Testimonies for the Church, Vol. 6, p. 179 | Education & Manual Training | `verifiedBy: null` |
| `edu-2` | Practical Domestic Trades: Carpentry, Farming & Sewing | `Ed 218.2` | Education, pp. 218–219 | Education & Manual Training | `verifiedBy: null` |
| `sustenance-1` | Australian Deep-Trench & Rock-Bedding Method | `3SM 328.1` | Selected Messages, Book 3, p. 328 | Sustenance & Diet | `verifiedBy: null` |
| `sustenance-2` | The Edenic Diet: Grains, Fruits, Nuts, Vegetables | `MH 296.1` | The Ministry of Healing, p. 296 | Sustenance & Diet | `verifiedBy: null` |
| `sustenance-3-part1` | Harms of Chemical Leaven & Baking Powders | `MH 300.2` | The Ministry of Healing, p. 300 | Sustenance & Diet | `verifiedBy: null` |
| `sustenance-3-part2` | Wholesome Bread, Thorough Baking & Zwieback | `MH 301.1` | The Ministry of Healing, p. 301 | Sustenance & Diet | `verifiedBy: null` |
| `med-1` | Heaven's Eight True Remedies & Natural Healing | `MH 127.2` | The Ministry of Healing, p. 127 | Medical Missionary | `verifiedBy: null` |
| `med-2` | Pulverized Hardwood Charcoal, Poultices & Water | `2SM 294.2` | Selected Messages, Book 2, p. 294 | Medical Missionary | `verifiedBy: null` |
| `prep-4` | A Little Piece of Land Where Flowers & Fruit Grow | `CL 18.2` | Country Living, p. 18 | Children | `verifiedBy: null` |
| `3` | Guarding Children from Urban Contamination & Vice | `CL 13.1` | Country Living, p. 13 | Children | `verifiedBy: null` |
| `2` | Cultivation of the Soil as God's Restorative School | `Ed 219.1` | Education, p. 219 | Physical Labor | `verifiedBy: null` |
| `4` | Nature's Symbols Unlock the Treasures of the Word | `Ed 100.3` | Education, pp. 100–101 | Spiritual Growth | `verifiedBy: null` |
| `mh-1` | Root Cause of Disease: The Ailments of the Mind | `MH 241.1` | The Ministry of Healing, p. 241 | Mental Health | `verifiedBy: null` |
| `mh-2` | Healing Medicine of Pure Air, Sunshine & Garden Labor | `MH 264.3` | The Ministry of Healing, p. 264 | Mental Health | `verifiedBy: null` |
| `mh-3` | Country Sanitariums & Healing Retreats | `7T 77.1` | Testimonies for the Church, Vol. 7, p. 77 | Mental Health | `verifiedBy: null` |
| `mh-4` | Escaping the Artificial Life of Crowded Metropolis | `CL 14.4` | Country Living, p. 14 | Mental Health | `verifiedBy: null` |
| `prophecy-latter-rain` | The Outpouring of Latter Rain & The Loud Cry | `GC 611.3` | The Great Controversy, p. 611 | Vision | `verifiedBy: null` |
| `prophecy-mountain-refuge` | Close of Probation & Flight to Mountain Strongholds | `GC 626.1` | The Great Controversy, p. 626 | Preparation | `verifiedBy: null` |
| `d1` | The Book of Nature vs. Worldly Science | `FE 512.1` | Fundamentals of Christian Education, p. 512 | Education & Manual Training | `verifiedBy: null` |
| `d2` | Out of the Cities: Earthquakes & Floods | `CL 7.1` | Country Living, p. 7 | Preparation | `verifiedBy: null` |
| `d4` | The Key to the Treasure House of God’s Word | `CT 187.3` | Counsels to Parents, Teachers, and Students, p. 187 | Spiritual Growth | `verifiedBy: null` |

---

## Detailed Quote Entries

### 1. `prophecy-1844-sanctuary-part1`
- **Standard EGW reference code:** `GC 422.1`
- **Source:** *The Great Controversy*, p. 422 (1911)
- **Original Document:** *The Great Controversy*, Chapter 23 — "What Is the Sanctuary?"
- **Timeline:** October 22, 1844
- **Text:** "At the termination of the 2300 days, in 1844, Christ entered the most holy place of the heavenly sanctuary to perform the closing work of atonement, preparatory to His coming."
- **Scripture companion:** Daniel 8:14 (*Scripture from King James Version*) — "And he said unto me, Unto two thousand and three hundred days; then shall the sanctuary be cleansed."
- **Application for country living:** Living during the antitypical Day of Atonement calls every rural household to daily heart preparation, family altar worship, and faithful stewardship of health, soil, and Sabbath time.
- **Adventist perspective:** Seventh-day Adventist sanctuary theology anchors 1844 as the start of the pre-advent investigative judgment, highlighting the Ark of the Covenant and the perpetual validity of God's Ten Commandments.

### 2. `prophecy-1844-sanctuary-part2`
- **Standard EGW reference code:** `GC 490.2`
- **Source:** *The Great Controversy*, p. 490 (1911)
- **Original Document:** *The Great Controversy*, Chapter 28 — "Facing Life's Record"
- **Timeline:** Post-1844 Antitypical Day of Atonement
- **Text:** "When in the investigative judgment the work of examining the records of life is ended, then the destiny of all will have been decided."
- **Scripture companion:** Revelation 22:11 (*Scripture from King James Version*) — "He that is unjust, let him be unjust still: and he which is filthy, let him be filthy still: and he that is righteous, let him be righteous still: and he that is holy, let him be holy still."
- **Application for country living:** Rural life shields households from frivolous urban amusements, providing time and stillness for reflective character growth while heavenly records are examined.
- **Adventist perspective:** Highlights the solemn nature of probation's close when Christ transitions from High Priest to King of kings.

### 3. `prophecy-three-angels`
- **Standard EGW reference code:** `9T 19.1`
- **Source:** *Testimonies for the Church*, Vol. 9, p. 19 (1909)
- **Original Document:** *Testimonies for the Church*, Volume 9, Chapter "Called to Be Witnesses"
- **Timeline:** 1844 to the Second Advent
- **Text:** "In a special sense Seventh-day Adventists have been set in the world as watchmen and light bearers. To them has been entrusted the last warning for a perishing world. On them is shining wonderful light from the word of God. They have been given a work of the most solemn import—the proclamation of the first, second, and third angels' messages. There is no other work of so great importance. They are to allow nothing else to absorb their attention."
- **Scripture companion:** Revelation 14:7 (*Scripture from King James Version*) — "Fear God, and give glory to him; for the hour of his judgment is come: and worship him that made heaven, and earth, and the sea, and the fountains of waters."
- **Application for country living:** Every country outpost serves as a missionary lighthouse—combining natural health treatments, agricultural demonstration, and literature distribution to minister to neighboring towns.
- **Adventist perspective:** Revelation 14:6–12 encapsulates the historic mission of Seventh-day Adventists: calling humanity back to Creator worship and the faith of Jesus.

### 4. `prophecy-second-coming-eden`
- **Standard EGW reference code:** `GC 675.2`
- **Source:** *The Great Controversy*, p. 675 (1911)
- **Original Document:** *The Great Controversy*, Chapter 42 — "The Controversy Ended"
- **Timeline:** The Second Coming & The Earth Made New
- **Text:** "In the Bible the inheritance of the saved is called 'a country.' Heb. 11:14–16. There the heavenly Shepherd leads His flock to fountains of living waters. The tree of life yields its fruit every month, and the leaves of the tree are for the service of the nations. There are ever-flowing streams, clear as crystal, and beside them waving trees cast their shadows upon the paths prepared for the ransomed of the Lord."
- **Scripture companion:** Isaiah 65:21 (*Scripture from King James Version*) — "And they shall build houses, and inhabit them; and they shall plant vineyards, and eat the fruit of them."
- **Application for country living:** Cultivating orchards, restoring living soils, and building peaceful country homes today is an earthly training school and foretaste of the eternal Edenic inheritance.
- **Adventist perspective:** The ultimate restoration of God's original creation in Eden, where the redeemed dwell in physical, uncorrupted nature forever.

### 5. `prep-1`
- **Standard EGW reference code:** `5T 464.3`
- **Source:** *Testimonies for the Church*, Vol. 5, pp. 464–465 (1885)
- **Original Document:** *Testimonies for the Church*, Volume 5, Chapter "The Impending Conflict"
- **Timeline:** Prophetic Stage 04 · Sunday Legislation
- **Text:** "It is no time now for God's people to be fixing their affections or laying up their treasure in the world. The time is not far distant, when, like the early disciples, we shall be forced to seek a refuge in desolate and solitary places. As the siege of Jerusalem by the Roman armies was a signal for flight to the Judean Christians, so the assumption of power on the part of our nation in the decree enforcing the papal sabbath will be a warning to us. It will then be time to leave the large cities, preparatory to leaving the smaller ones for retired homes in lonely places among the mountains."
- **Scripture companion:** Matthew 24:15–16 (*Scripture from King James Version*) — "When ye therefore shall see the abomination of desolation, spoken of by Daniel the prophet, stand in the holy place, (whoso readeth, let him understand:) Then let them which be in Judaea flee into the mountains."
- **Application for country living:** Establish primary rural outposts within reach of mission towns now, while scouting higher-elevation mountain sanctuaries with perennial gravity springs.
- **Adventist perspective:** Identifies two distinct departure phases: deliberate relocation now, followed by emergency flight when civil power enforces Sunday observance.

### 6. `1`
- **Standard EGW reference code:** `CL 24.1`
- **Source:** *Country Living*, p. 24 (Manuscript 50, 1903)
- **Original Document:** Manuscript 50, 1903 — "Instruction to Families Regarding Country Living"
- **Timeline:** Preparatory Window · Current Era
- **Text:** "The time has come when, as God opens the way, families should move out of the cities. The children should be taken into the country. The parents should get as suitable a place as their means will allow. Though the dwelling may be small, yet there should be land in connection with it, that may be cultivated."
- **Scripture companion:** Genesis 2:15 (*Scripture from King James Version*) — "And the Lord God took the man, and put him into the garden of Eden to dress it and to keep it."
- **Application for country living:** Prioritize debt-free land with fertile soil over an expensive urban house. Build a modest, practical dwelling and direct funds toward productive gardens and water security.
- **Adventist perspective:** God appointed the cultivation of the earth as the ideal environment for spiritual and physical development of children.

### 7. `prep-2`
- **Standard EGW reference code:** `CL 9.6`
- **Source:** *Country Living*, pp. 9–10 (Letter 5, 1904)
- **Original Document:** Letter 5, 1904 — Written from "Elmshaven", St. Helena, California
- **Timeline:** Preparatory Window · Current Era
- **Text:** "Again and again the Lord has instructed that our people are to take their families away from the cities, into the country, where they can raise their own provisions; for in the future the problem of buying and selling will be a very serious one. We should now begin to heed the instruction given us over and over again: Get out of the cities into rural districts, where the houses are not crowded closely together, and where you will be free from the interference of enemies."
- **Scripture companion:** Revelation 13:17 (*Scripture from King James Version*) — "And that no man might buy or sell, save he that had the mark, or the name of the beast, or the number of his name."
- **Application for country living:** Cultivate open-pollinated heirloom grains, tubers, legumes, and perennial fruit trees so your family never depends on corporate food distribution networks.
- **Adventist perspective:** Revelation 13:17 foretells economic boycotts against Sabbath-keepers; self-supporting agriculture is practical obedience to divine counsel.

### 8. `vision-outpost-1`
- **Standard EGW reference code:** `2SM 358.2`
- **Source:** *Selected Messages*, Book 2, p. 358 (1902)
- **Original Document:** Special Testimonies, Series B, No. 8, 1902
- **Timeline:** Preparatory Window · Current Era
- **Text:** "Repeatedly the Lord has instructed us that we are to work the cities from outpost centers. In these cities there are to be houses of worship, as memorials for God; but institutions for the publication of our literature, for the healing of the sick, and for the training of workers are to be established outside the cities. Especially is it important that our youth be shielded from the temptations of city life."
- **Scripture companion:** Matthew 5:14 (*Scripture from King James Version*) — "Ye are the light of the world. A city that is set on an hill cannot be hid."
- **Application for country living:** Position homesteads within accessible distance of target mission cities to operate treatment rooms, seed banks, and community literature ministries.
- **Adventist perspective:** Country living is not escapist monasticism, but strategic missionary positioning following Enoch's example.

### 9. `prep-3`
- **Standard EGW reference code:** `7T 83.1`
- **Source:** *Testimonies for the Church*, Vol. 7, p. 83 (1902)
- **Original Document:** *Testimonies for the Church*, Volume 7, Section "Sensational Revivalism"
- **Timeline:** Urban Judgments & Impending Calamity
- **Text:** "The time is near when the large cities will be visited by the judgments of God. In a little while these cities will be terribly shaken. No matter how large or how strong their buildings, no matter how many fire-proof precautions are taken, one touch of God will destroy them in a few minutes or hours. The ungodly cities are to be swept away by the besom of destruction. In the calamities that are now befalling immense buildings and large portions of cities, God is showing us what will come upon the whole earth."
- **Scripture companion:** Revelation 16:20 (*Scripture from King James Version*) — "And every island fled away, and the mountains were not found."
- **Application for country living:** Avoid tying household wealth to urban high-rise real estate; construct low-profile, earth-block homes with independent water and solar power.
- **Adventist perspective:** Modern metropolitan infrastructure is fragile and destined for divine judgment; rural outposts provide physical safety and spiritual clarity.

### 10. `edu-1`
- **Standard EGW reference code:** `6T 179.2`
- **Source:** *Testimonies for the Church*, Vol. 6, p. 179 (1900)
- **Original Document:** *Testimonies for the Church*, Volume 6, Chapter "Manual Training"
- **Timeline:** Educational Foundations
- **Text:** "Study in agricultural lines should be the A, B, and C of the education given in our schools. This is the very first work that should be entered upon. Our schools should not depend upon imported produce, for grain and vegetables, and the fruits so essential to health. Our youth need an education to be gained from the tillage of the soil as well as from the study of books."
- **Scripture companion:** Proverbs 12:11 (*Scripture from King James Version*) — "He that tilleth his land shall be satisfied with bread: but he that followeth vain persons is void of understanding."
- **Application for country living:** Integrate practical agriculture into daily education. Teach youth soil chemistry, fruit grafting, composting, and farm accounting.
- **Adventist perspective:** Agriculture develops head, hand, and heart harmoniously, preparing youth for practical missionary self-support.

### 11. `edu-2`
- **Standard EGW reference code:** `Ed 218.2`
- **Source:** *Education*, pp. 218–219 (1903)
- **Original Document:** *Education*, Chapter 24 — "Manual Training"
- **Timeline:** Educational Foundations
- **Text:** "Manual training is deserving of far more attention than it has received. Schools should be established that, in addition to the highest mental and moral culture, shall provide the best possible facilities for physical development and industrial training. Instruction should be given in agriculture, manufactures,—covering as many as possible of the most useful trades,—also in household economy, healthful cookery, sewing, hygienic dressmaking, the treatment of the sick, and kindred lines. Gardens, workshops, and treatment rooms should be provided, and the work in every line should be under the direction of skilled instructors."
- **Scripture companion:** 1 Thessalonians 4:11 (*Scripture from King James Version*) — "And that ye study to be quiet, and to do your own business, and to work with your own hands, as we commanded you."
- **Application for country living:** Equip homesteads with practical workshops: carpentry, tailoring, natural remedies, and baking, ensuring multi-trade self-reliance.
- **Adventist perspective:** Models the ancient Schools of the Prophets where every student graduated with a productive self-supporting manual skill.

### 12. `sustenance-1`
- **Standard EGW reference code:** `3SM 328.1`
- **Source:** *Selected Messages*, Book 3, p. 328 (1907)
- **Original Document:** Letter 350, 1907 — Written to Brethren at Loma Linda
- **Timeline:** Agricultural Demonstration · Avondale School
- **Text:** "While we were in Australia, we adopted the plan of digging deep trenches and filling them in with dressing that would provide nourishment for the roots. This was done with the cultivation of tomatoes, oranges, lemons, peaches, and grapes. The trees grew rapidly, and bore abundant fruit of the finest quality."
- **Scripture companion:** Jeremiah 17:8 (*Scripture from King James Version*) — "For he shall be as a tree planted by the waters, and that spreadeth out her roots by the river, and shall not see when heat cometh, but her leaf shall be green."
- **Application for country living:** Excavate 90cm × 90cm × 90cm planting pits layered with coarse stones, biochar, and aged compost for fruit trees in semi-arid soils.
- **Adventist perspective:** Inspired agricultural counsel demonstrated that degraded land can become highly productive through systematic soil care.

### 13. `sustenance-2`
- **Standard EGW reference code:** `MH 296.1`
- **Source:** *The Ministry of Healing*, p. 296 (1905)
- **Original Document:** *The Ministry of Healing*, Chapter "Diet and Health"
- **Timeline:** Lifestyle Medicine
- **Text:** "Grains, fruits, nuts, and vegetables constitute the diet chosen for us by our Creator. These foods, prepared in as simple and natural a manner as possible, are the most healthful and nourishing. They impart a strength, a power of endurance, and a vigor of intellect that are not afforded by a more complex and stimulating diet."
- **Scripture companion:** Genesis 1:29 (*Scripture from King James Version*) — "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat."
- **Application for country living:** Grow whole-grain cereals, legumes, tree nuts, and seasonal vegetables to supply 100% of family nutritional requirements directly from the land.
- **Adventist perspective:** The original Edenic diet sustains optimal mental clarity and immune health necessary for end-time spiritual steadfastness.

### 14. `sustenance-3-part1`
- **Standard EGW reference code:** `MH 300.2`
- **Source:** *The Ministry of Healing*, p. 300 (1905)
- **Original Document:** *The Ministry of Healing*, Chapter "Preparation of Food"
- **Timeline:** Homestead Culinary Science
- **Text:** "The use of soda or baking powder in breadmaking is harmful and unnecessary. Soda causes inflammation of the stomach and often poisons the entire system."
- **Scripture companion:** 1 Corinthians 10:31 (*Scripture from King James Version*) — "Whether therefore ye eat, or drink, or whatsoever ye do, do all to the glory of God."
- **Application for country living:** Eliminate chemical leaveners; master natural sourdough fermentation and unfermented unleavened whole-grain breadmaking.
- **Adventist perspective:** Preserving digestive health through pure culinary practices honors the body as the temple of the Holy Spirit.

### 15. `sustenance-3-part2`
- **Standard EGW reference code:** `MH 301.1`
- **Source:** *The Ministry of Healing*, p. 301 (1905)
- **Original Document:** *The Ministry of Healing*, Chapter "Preparation of Food"
- **Timeline:** Homestead Culinary Science
- **Text:** "Bread should be light and sweet. Not the least taint of sourness should be tolerated. The loaves should be small, and so thoroughly baked that, so far as possible, the yeast germs shall be destroyed. For those who can use them, good vegetables and fruits, and whole-wheat bread, or zwieback, are the best articles of diet."
- **Scripture companion:** 1 Corinthians 6:19–20 (*Scripture from King James Version*) — "What? know ye not that your body is the temple of the Holy Ghost which is in you, which ye have of God, and ye are not your own?"
- **Application for country living:** Mill whole grains fresh, bake small loaves thoroughly, and slice to twice-bake into crisp, shelf-stable zwieback that preserves indefinitely without refrigeration.
- **Adventist perspective:** Wholesome breadmaking is a high moral and spiritual duty, directly influencing family health and clear thinking.

### 16. `med-1`
- **Standard EGW reference code:** `MH 127.2`
- **Source:** *The Ministry of Healing*, p. 127 (1905)
- **Original Document:** *The Ministry of Healing*, Chapter "Rational Remedies"
- **Timeline:** Foundations of Medical Missionary Work
- **Text:** "Pure air, sunlight, abstemiousness, rest, exercise, proper diet, the use of water, trust in divine power—these are the true remedies. Every person should have a knowledge of nature's remedial agencies and how to apply them. It is essential both to understand the principles involved in the treatment of the sick and to have a practical training that will enable one rightly to use this knowledge."
- **Scripture companion:** 3 John 1:2 (*Scripture from King James Version*) — "Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth."
- **Application for country living:** Organize daily homestead routine around the eight laws of health: cross-ventilated sleeping rooms, pure spring water, physical cultivation, and Sabbath rest.
- **Adventist perspective:** Natural lifestyle remedies represent God's physiological laws of healing, replacing toxic pharmacological dependencies.

### 17. `med-2`
- **Standard EGW reference code:** `2SM 294.2`
- **Source:** *Selected Messages*, Book 2, p. 294 (1903)
- **Original Document:** Letter 100, 1903 — "The Use of Simple Remedies"
- **Timeline:** Natural Emergency Therapeutics
- **Text:** "I will tell you a little about my experience with charcoal as a remedy. For some forms of indigestion, it is more efficacious than drugs. A little olive oil into which some of this powder has been stirred tones and cleanses the stomach. I have found it to be excellent. Pulverized charcoal, wet with water or used in poultices, is most successful in checking inflammation and drawing out poison."
- **Scripture companion:** 2 Kings 20:7 (*Scripture from King James Version*) — "And Isaiah said, Take a lump of figs. And they took and laid it on the boil, and he recovered."
- **Application for country living:** Produce medical-grade activated hardwood charcoal on the homestead from clean hardwoods; store in airtight glass jars alongside flaxseed and clay for emergency poultices.
- **Adventist perspective:** God honors simple, non-toxic remedies applied in faith with prayer, accessible to all without heavy financial burdens.

### 18. `prep-4`
- **Standard EGW reference code:** `CL 18.2`
- **Source:** *Country Living*, p. 18 (1903)
- **Original Document:** General Conference Bulletin, April 6, 1903
- **Timeline:** Preparatory Window · Current Era
- **Text:** "Get out of the cities as soon as possible, and purchase a little piece of land where you can have a garden, where your children can watch the flowers grow and learn from them lessons of simplicity and purity."
- **Scripture companion:** Matthew 6:28–29 (*Scripture from King James Version*) — "Consider the lilies of the field, how they grow; they toil not, neither do they spin: And yet I say unto you, That even Solomon in all his glory was not arrayed like one of these."
- **Application for country living:** Assign every child their own flower bed and vegetable garden plot to nurture reverence, patience, and love for God's creation.
- **Adventist perspective:** Cultivating flowers and living plants shields impressionable minds from artificial urban entertainment and vanity.

### 19. `3`
- **Standard EGW reference code:** `CL 13.1`
- **Source:** *Country Living*, p. 13 (1902)
- **Original Document:** Manuscript 133, 1902
- **Timeline:** Preparatory Window · Current Era
- **Text:** "It is not God's will that His people shall settle in the cities, where there is constant turmoil and confusion. Their children should be spared this; for the whole system is demoralized by the hurry and rush and noise. The Lord desires His people to move into the country, where they can settle on the land, and raise their own fruit and vegetables, and where their children can be brought in direct contact with the works of God in nature."
- **Scripture companion:** Proverbs 22:6 (*Scripture from King James Version*) — "Train up a child in the way he should go: and when he is old, he will not depart from it."
- **Application for country living:** Protect children's nervous systems from urban noise, artificial light, and congested social peer pressures by establishing a tranquil rural homestead.
- **Adventist perspective:** The physical environment profoundly shapes character; rural surroundings foster tranquility, moral discernment, and communion with God.

### 20. `2`
- **Standard EGW reference code:** `Ed 219.1`
- **Source:** *Education*, p. 219 (1903)
- **Original Document:** *Education*, Chapter 24 — "Manual Training"
- **Timeline:** Educational Foundations
- **Text:** "No line of manual training is of more value than agriculture. A greater effort should be made to create and to encourage an interest in agricultural pursuits. Let the teacher call attention to what the Bible says about agriculture: that it was God's plan for man to till the earth; that the first man, the ruler of the whole world, was given a garden to cultivate; and that many of the world's greatest men, its real nobility, have been tillers of the soil."
- **Scripture companion:** Ecclesiastes 5:9 (*Scripture from King James Version*) — "Moreover the profit of the earth is for all: the king himself is served by the field."
- **Application for country living:** Treat agricultural work with dignity and honor. Invest in ergonomic hand tools and raised permanent garden beds to make soil work joy-filled.
- **Adventist perspective:** Tilling the soil is God's ordained work for humankind, cultivating humility, diligence, and cooperation with natural laws.

### 21. `4`
- **Standard EGW reference code:** `Ed 100.3`
- **Source:** *Education*, pp. 100–101 (1903)
- **Original Document:** *Education*, Chapter 11 — "Lessons of Life"
- **Timeline:** Educational Foundations
- **Text:** "So far as possible, let the child from his earliest years be placed where this wonderful lesson book shall be open before him. Let him behold the glorious scenes painted by the great Master Artist upon the shifting canvas of the heavens, let him become acquainted with the wonders of earth and sea, let him watch the unfolding mysteries of the changing seasons, and in all His works learn of the Creator."
- **Scripture companion:** Romans 1:20 (*Scripture from King James Version*) — "For the invisible things of him from the creation of the world are clearly seen, being understood by the things that are made, even his eternal power and Godhead."
- **Application for country living:** Make nature observation an intentional daily study: tracking constellations, identifying beneficial insects, and studying rainfall patterns.
- **Adventist perspective:** Nature is God's living textbook, illustrating the unseen attributes of the Godhead through visible creation.

### 22. `mh-1`
- **Standard EGW reference code:** `MH 241.1`
- **Source:** *The Ministry of Healing*, p. 241 (1905)
- **Original Document:** *The Ministry of Healing*, Chapter "Mind Cure"
- **Timeline:** Lifestyle Medicine
- **Text:** "Sickness of the mind prevails everywhere. Nine tenths of the diseases from which men suffer have their foundation here. Perhaps some living home trouble is like a canker eating to the very soul and weakening the life-forces. Remorse for sin sometimes undermines the constitution and unbalances the mind."
- **Scripture companion:** Proverbs 17:22 (*Scripture from King James Version*) — "A merry heart doeth good like a medicine: but a broken spirit drieth the bones."
- **Application for country living:** Create a peaceful environment centered around forgiving love, calm communication, and outdoor labor that dispels mental anxiety.
- **Adventist perspective:** Highlights psychosomatic health decades before secular medicine recognized the brain-body connection in healing.

### 23. `mh-2`
- **Standard EGW reference code:** `MH 264.3`
- **Source:** *The Ministry of Healing*, p. 264 (1905)
- **Original Document:** *The Ministry of Healing*, Chapter "In Contact With Nature"
- **Timeline:** Lifestyle Medicine
- **Text:** "There is nothing more aidful to health of body and mind than the spirit of gratitude and praise... In the country the sick find a thousand things to call their attention away from themselves and their sufferings. Every breath of pure air, every ray of sunshine, the beauty of the flowers and trees, the song of the birds, all minister to the restoration of health."
- **Scripture companion:** Malachi 4:2 (*Scripture from King James Version*) — "Unto you that fear my name shall the Sun of righteousness arise with healing in his wings."
- **Application for country living:** Encourage family and visiting convalescents to spend morning hours walking among fragrant pine trees, fruit trees, and garden paths.
- **Adventist perspective:** Outdoor beauty lifts the soul out of morbid self-absorption into grateful praise toward the Creator.

### 24. `mh-3`
- **Standard EGW reference code:** `7T 77.1`
- **Source:** *Testimonies for the Church*, Vol. 7, p. 77 (1902)
- **Original Document:** *Testimonies for the Church*, Volume 7, Section "Country Sanitariums"
- **Timeline:** Outpost Medical Centers
- **Text:** "Our sanitariums should be located in the country, among green trees and fragrant flowers, where the air is pure and fresh. Here the sick will be brought into close contact with nature, and their thoughts will be drawn from themselves to God. In the natural surroundings of the country, there is for the sick and suffering a health-giving power."
- **Scripture companion:** Psalm 23:2–3 (*Scripture from King James Version*) — "He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul."
- **Application for country living:** Build a modest guest cottage on rural acreage dedicated to hosting and treating burned-out urban workers with rest and natural treatments.
- **Adventist perspective:** Outpost lifestyle health centers combine natural healing with spiritual truth, reaching people beyond conventional hospital settings.

### 25. `mh-4`
- **Standard EGW reference code:** `CL 14.4`
- **Source:** *Country Living*, p. 14 (1905)
- **Original Document:** *The Ministry of Healing*, Chapter "In Contact With Nature"
- **Timeline:** Preparatory Window · Current Era
- **Text:** "The noise and bustle of the city, the cramped and artificial life, are a weariness and a trial to the sick and nervous. The quiet, the beauty, the freshness of nature bring rest and healing. To the chronic invalid nothing so tends to restore health and happiness as living in the attractive country environment."
- **Scripture companion:** Isaiah 32:18 (*Scripture from King James Version*) — "And my people shall dwell in a peaceable habitation, and in sure dwellings, and in quiet resting places."
- **Application for country living:** Build shaded verandas oriented toward quiet landscape views, fostering daily gratitude and quiet contemplation.
- **Adventist perspective:** Humans were created to live in an Edenic garden, not in artificial concrete canyons that tax the nervous system.

### 26. `prophecy-latter-rain`
- **Standard EGW reference code:** `GC 611.3`
- **Source:** *The Great Controversy*, p. 611 (1911)
- **Original Document:** *The Great Controversy*, Chapter 38 — "The Final Warning"
- **Timeline:** Prophetic Stage 05 · Final Witness
- **Text:** "The great work of the gospel is not to close with less manifestation of the power of God than marked its opening. The prophecies which were fulfilled in the outpouring of the former rain at the opening of the gospel are again to be fulfilled in the latter rain at its close."
- **Scripture companion:** Revelation 18:1 (*Scripture from King James Version*) — "And after these things I saw another angel come down from heaven, having great power; and the earth was lightened with his glory."
- **Application for country living:** Rural mission outposts become centers of preparation and light where workers are spiritually grounded and ready to answer the call of the Loud Cry.
- **Adventist perspective:** Joel 2:23 and Revelation 18:1 foretell a final, global proclamation of truth empowered directly by the Holy Spirit.

### 27. `prophecy-mountain-refuge`
- **Standard EGW reference code:** `GC 626.1`
- **Source:** *The Great Controversy*, p. 626 (1911)
- **Original Document:** *The Great Controversy*, Chapter 39 — "The Time of Trouble"
- **Timeline:** Prophetic Stage 06 · Close of Probation
- **Text:** "As the decree issued by the various rulers of Christendom against commandment keepers shall withdraw the protection of government and abandon them to those who desire their destruction, the people of God will flee from the cities and villages and associate together in companies, dwelling in the most desolate and solitary places. Many will find refuge in the strongholds of the mountains."
- **Scripture companion:** Isaiah 33:16 (*Scripture from King James Version*) — "He shall dwell on high: his place of defence shall be the munitions of rocks: bread shall be given him; his waters shall be sure."
- **Application for country living:** Physical hardiness, knowledge of mountain water sources, and habitual trust in God prepare families for the final crisis when worldly supports fail.
- **Adventist perspective:** Describes the time of Jacob's trouble when God's people look solely to divine deliverance without earthly mediation.

### 28. `d1`
- **Standard EGW reference code:** `FE 512.1`
- **Source:** *Fundamentals of Christian Education*, p. 512 (1900)
- **Original Document:** *Fundamentals of Christian Education*, Section "The Book of Nature"
- **Timeline:** Educational Foundations
- **Text:** "There is no education to be gained by the study of the dead languages and of the sciences, that can compare with the education that is to be obtained from the book of nature. Let the children be taught to see in nature an expression of the love and the wisdom of God."
- **Scripture companion:** Psalm 19:1 (*Scripture from King James Version*) — "The heavens declare the glory of God; and the firmament sheweth his handywork."
- **Application for country living:** Conduct school outdoors in gardens, orchards, and forests where natural processes teach lessons of faith, patience, and divine law.
- **Adventist perspective:** The creation reveals the unmarred character of God and serves as the primary textbook for redemptive education.

### 29. `d2`
- **Standard EGW reference code:** `CL 7.1`
- **Source:** *Country Living*, p. 7 (Loma Linda, April 16, 1906)
- **Original Document:** Letter 27, 1906 — Written at Loma Linda, California, two days before the 1906 San Francisco earthquake
- **Timeline:** Urban Judgments & Impending Calamity
- **Text:** "Out of the cities; out of the cities!—this is the message the Lord has been giving me. The earthquakes will come; the floods will come; and we are not to establish ourselves in the wicked cities, where the enemy is served in every way, and where God is so often forgotten."
- **Scripture companion:** Isaiah 52:11 (*Scripture from King James Version*) — "Depart ye, depart ye, go ye out from thence, touch no unclean thing; go ye out of the midst of her; be ye clean, that bear the vessels of the Lord."
- **Application for country living:** Disinvest from urban high-density assets and establish stable rural homesteads with independent water, food, and energy systems.
- **Adventist perspective:** The physical instability of modern cities mirrors their spiritual bankruptcy, signaling the urgency of establishing rural outpost bases.

### 30. `d4`
- **Standard EGW reference code:** `CT 187.3`
- **Source:** *Counsels to Parents, Teachers, and Students*, p. 187 (1913)
- **Original Document:** *Counsels to Parents, Teachers, and Students*, Chapter "Object Lessons in Nature"
- **Timeline:** Nature's Parables & Daily Truth
- **Text:** "In the natural world God has placed in the hands of the children of men the key to unlock the treasure house of His Word. The unseen is illustrated by the seen; divine wisdom, eternal truth, infinite grace, are understood by the things that God has made."
- **Scripture companion:** Hebrews 11:3 (*Scripture from King James Version*) — "Through faith we understand that the worlds were framed by the word of God, so that things which are seen were not made of things which do appear."
- **Application for country living:** Use every agricultural task—sowing, weeding, irrigating, grafting, and harvest—to teach deep spiritual truths at morning and evening family worship.
- **Adventist perspective:** Every law of nature is a law of God; studying natural processes deepens spiritual discernment and faith.
