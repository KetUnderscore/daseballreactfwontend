function Mods() {
    return (
        <div className="player">
            <h1>MODS</h1>
            <h2 className="center">Team Mods</h2>
            <div className="mod-container">
                <div className='mod'>
                    <h3 className="center">Partying</h3>
                    <img src="https://i.imgur.com/83JqkX2.png" height="50px" title="This team is out of the running and partying!"></img>
                    <p className="center">A team will gain the Partying mod when they no longer have a chance to make the playoffs.
                    <br/>Partying teams have a chance to Party during games they are playing for small stat increases.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Stable</h3>
                    <img src="https://i.imgur.com/TWKgRZQ.png" height="50px" title="This team is stable. Safe from Shuffle and Waves."></img>
                    <p className="center">Stable teams will be protected from both Shuffle and Waves.
                    <br/>Stable wears off after a season.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Witness Protection</h3>
                    <img src="https://i.imgur.com/pclDlgi.png" height="50px" title="This team is protected from the Witness."></img>
                    <p className="center">Teams with Witness Protection will be protected from the Witness.
                    <br/>Witness Protection wears off after a season.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Sunspotting</h3>
                    <img src="https://i.imgur.com/paSBr57.png" height="50px" title="This team is spotting the Sun."></img>
                    <p className="center">Teams with Sunspotting will be protected from negative effects in the Sun.
                    <br/>This team may change the weather to Sunny.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Nullspotting</h3>
                    <img src="https://i.imgur.com/xgFVMnL.png" height="50px" title="This team is spotting the Null."></img>
                    <p className="center">Teams with Nullspotting will be protected from negative effects in the Null.
                    <br/>This team may change the weather to Null.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Wavey</h3>
                    <img src="https://i.imgur.com/MmKiNb3.png" height="50px" title="This team is riding the Waves."></img>
                    <p className="center">Teams with Wavey will be protected from negative effects in Waves.
                    <br/>This team may change the weather to Waves.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Winding</h3>
                    <img src="https://i.imgur.com/WhmmTqP.png" height="50px" title="This team is feeling the Shuffle."></img>
                    <p className="center">Teams with Winding will be protected from negative effects in Shuffle.
                    <br/>This team may change the weather to Shuffle.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Coffee Lovers</h3>
                    <img src="https://i.imgur.com/1WdpOMz.png" height="50px" title="This team may start pouring coffee."></img>
                    <p className="center">This team may change the weather to Coffee.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Tape Lovers</h3>
                    <img src="https://i.imgur.com/NBMbLYO.png" height="50px" title="This team may start skipping."></img>
                    <p className="center">This team may change the weather to Skipping.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Homefield Advantage</h3>
                    <img src="https://i.imgur.com/tCnQYQ2.png" height="50px" title="This team has a homefield advantage!"></img>
                    <p className="center">This team starts with 1 run when playing a home game.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Trapped</h3>
                    <img src="https://i.imgur.com/AiC1xek.png" height="50px" title="This team has trapped their home."></img>
                    <p className="center">This teams opponent starts with -1 run when playing a home game.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Fourth Strike</h3>
                    <img src="https://i.imgur.com/eWPduqh.png" height="50px" title="This team gets four strikes!"></img>
                    <p className="center">This teams batters need four strikes to be sent out.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Three Force</h3>
                    <img src="https://i.imgur.com/5P3yQY1.png" height="50px" title="This team only gets three balls!"></img>
                    <p className="center">This teams batters only need three balls to draw a walk.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Seasoned</h3>
                    <img src="https://i.imgur.com/KxZwfCp.png" height="50px" title="This team is being seasoned."></img>
                    <p className="center">This team will gain stars at the end of a season.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Suck Forever</h3>
                    <img src="https://i.imgur.com/G4L25nw.png" height="50px" title="This team will suck forever."></img>
                    <p className="center">Teams that Suck Forever will lose one star when they realize their fate.
                    <br/>Teams that Suck Forever will party while losing by two or more points.
                    <br/>Becomes Pretty Good after reaching playoffs.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Pretty Good</h3>
                    <img src="https://i.imgur.com/T1cNfGP.png" height="50px" title="This team is pretty good."></img>
                    <p className="center">This team is Pretty Good.
                    <br/>Players on this team play better.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Throwing</h3>
                    <img src="https://i.imgur.com/TB9pEdp.png" height="50px" title="This team just doesn't care."></img>
                    <p className="center">Teams that are Throwing will play worse this season.
                    <br/>Teams that are Throwing will party harder this season.</p>
                </div>
            </div>


            <h3 className="center">Spirit Mods</h3>
            <div className="mod-container">
                <div className='mod'>
                    <h3 className="center">Travelling</h3>
                    <img src="https://i.imgur.com/m6JHgdb.png" height="50px" title="This team is always on the go."></img>
                    <p className="center">Teams that are Travelling will play better in Away games.
                    <br/>Players that join this team will get a slight buff.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Oceanic</h3>
                    <img src="https://i.imgur.com/qnyuEgo.png" height="50px" title="This team is watery."></img>
                    <p className="center">Players on Teams that are Oceanic count as Sirens.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Candied</h3>
                    <img src="https://i.imgur.com/aGVPbix.png" height="50px" title="This team is candied."></img>
                    <p className="center">Players on this team play better earlier in the season.
                    <br/>Players on this team may eat their non spirit items.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Hexagonal</h3>
                    <img src="https://i.imgur.com/ufzG0Xr.png" height="50px" title="This team likes sixes."></img>
                    <p className="center">This team has an affinity for the number 6.</p>
                </div>
            </div>

            
            <h2 className="center">Player Mods</h2>
            <h3 className="center">Crossover Mods</h3>
            <div className="mod-container">
                <div className='mod'>
                    <h3 className="center">Visitor</h3>
                    <img src="https://i.imgur.com/ZjehUbe.png" height="50px" title="This player is a visitor from a far off land."></img>
                    <p className="center">A Visitor is from another Splort League that you should go check out.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Hlockey</h3>
                    <img src="https://i.imgur.com/kUcBFL9.png" height="50px" title="This player plays in Hlockey. This player has improved Assault."></img>
                    <p className="center">Hlockey players have improved Assault to reflect their violent nature.
                    <br/>Go check out <a href='https://hlockey.gay/'>Hlockey</a>!</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Terror Ball</h3>
                    <img src="https://i.imgur.com/iRVkDQU.png" height="50px" title="This player plays in Terror Ball. This player has improved Return Of The Killer Tomatoes 2."></img>
                    <p className="center">Terror Ball players have improved Return Of The Killer Tomatoes 2 to reflect their impressive survival instincts.
                    <br/>Go check out <a href='https://terrorball.io/'>Terror Ball</a>!</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Narrative League</h3>
                    <img src="https://i.imgur.com/UOktOHC.png" height="50px" title="This player plays for the Narrative League. Things will happen to this player."></img>
                    <p className="center">Narrative League players have a higher chance for random events to happen to them to reflect their watchful nature.
                    <br/>Go check out <a href='https://blaseball.fomalhautx.com/'>Narrative League</a>!</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Alternate League</h3>
                    <img src="https://i.imgur.com/MJlBNU0.png" height="50px" title="This player plays for the Alternate League. This player has done this before."></img>
                    <p className="center">Alternate League players have done this all before and seem to be generally better at most everything.
                    <br/>Go check out <a href='https://discord.gg/y84mKfUGjg'>Alternate League</a>!</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Blittle League</h3>
                    <img src="https://i.imgur.com/keUYQ24.png" height="50px" title="This player plays for the Blittle League. This player is still growing."></img>
                    <p className="center">Blittle League players have some growing to do and play better as the season goes on.
                    <br/>Go check out <a href='https://www.blittleleague.com/'>Blittle League</a>!</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Reverberating</h3>
                    <img src="https://i.imgur.com/UdlzP7K.png" height="50px" title="A Reverberating Player has a small chance of batting again after each of their At-Bats end."></img>
                    <p className="center">Reverberating players have a chance of batting again immediately after their at-bat ends, as if they had "jumped the queue" in their team's lineup.
                    <br/>If their previous at-bat ended in a hit, this can end with a player being simultaneously on base and batting.
                    <br/>Blaseball RIV.</p>
                </div>
            </div>

            <h3 className="center">Zodiac Mods</h3>
            <div className="mod-container">
                <div className='mod'>
                    <h3 className="center">Zodiac</h3>
                    <img src="https://i.imgur.com/qJlX78M.png" height="50px" title="This player is a Zodiac player."></img>
                    <p className="center">This player is a Zodiac player.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Shepard</h3>
                    <img src="https://i.imgur.com/zm2KgpM.png" height="50px" title="This player plays better for every player on base."></img>
                    <p className="center">Shepards play better for every player on base.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Sunsetter</h3>
                    <img src="https://i.imgur.com/nsGvwgp.png" height="50px" title="This player plays better later in the game."></img>
                    <p className="center">Sunsetters play better the longer a game goes on.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Sprinter</h3>
                    <img src="https://i.imgur.com/xLI45y0.png" height="50px" title="This player always trys to steal."></img>
                    <p className="center">Sprinters will always try to steal when given the opportunity.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Puppet</h3>
                    <img src="https://i.imgur.com/aFXHBBC.png" height="50px" title="This player is stuck on strings."></img>
                    <p className="center">Puppet players play better with more pocket players on their team.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Off Rails</h3>
                    <img src="https://i.imgur.com/x5YT2PX.png" height="50px" title="This player is stuck on strings."></img>
                    <p className="center">Off Rails players get better every time their position changes.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Twinkle Twinkle</h3>
                    <img src="https://i.imgur.com/NzyFjCl.png" height="50px" title="This player is twinkling."></img>
                    <p className="center">Twinkle Twinkle players may inflict opponents with Twink, Twunk or Twonk.</p>
                </div>
            </div>

            <h3 className="center">Permanent Mods</h3>
            <div className="mod-container">
                <div className='mod'>
                    <h3 className="center">Icon</h3>
                    <img src="https://i.imgur.com/qbFbglH.png" height="50px" title="This player is an icon. Doubled favorite payouts!"></img>
                    <p className="center">Icons pay out double coins to their fans.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Icon+</h3>
                    <img src="https://i.imgur.com/9jU25eY.png" height="50px" title="This player is an icon+. Tripled favorite payouts!"></img>
                    <p className="center">Icon+ players pay out triple coins to their fans.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Icon++</h3>
                    <img src="https://i.imgur.com/Hb8yFtj.png" height="50px" title="This player is an icon++. Quadruple favorite payouts!"></img>
                    <p className="center">Icon++ players pay out quadruple coins to their fans.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Icon+++</h3>
                    <img src="https://i.imgur.com/qra2kKd.png" height="50px" title="This player is an icon+++. Quintuple favorite payouts!"></img>
                    <p className="center">Icon+++ players pay out quintuple coins to their fans.
                    <br/>These players tend to be stressed.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Noncon</h3>
                    <img src="https://i.imgur.com/KGGTgET.png" height="50px" title="This player does not pay out..."></img>
                    <p className="center">Noncons don't pay out.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Stressed</h3>
                    <img src="https://i.imgur.com/4yYcNhd.png" height="50px" title="This player is stressed! Any more and they might get crushed..."></img>
                    <p className="center">Stressed pitchers play worse on teams with less than 5 pitchers.
                    <br/>Stressed batters play worse on teams with less than 12 batters.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Old School</h3>
                    <img src="https://i.imgur.com/yvlrdat.png" height="50px" title="This player enjoys the Null."></img>
                    <p className="center">Old School players play better in the Null.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">New Cool</h3>
                    <img src="https://i.imgur.com/MX8RFc4.png" height="50px" title="This player enjoys the Sun."></img>
                    <p className="center">New Cool players play better in the Sun.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Early Bird</h3>
                    <img src="https://i.imgur.com/4OKwfNk.png" height="50px" title="This player draws a walk on three balls."></img>
                    <p className="center">Early Birds draw walks on three balls instead of four.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Armored</h3>
                    <img src="https://i.imgur.com/GhGTsez.png" height="50px" title="This player is prepared."></img>
                    <p className="center">This player is prepared.
                    <br/>This player needs an extra strike to be made out.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Multiple</h3>
                    <img src="https://i.imgur.com/P9EWUY3.png" height="50px" title="This player scores double."></img>
                    <p className="center">Multiples score for twice as much.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Siren</h3>
                    <img src="https://i.imgur.com/3CsxZ4f.png" height="50px" title="This player has an alluring voice."></img>
                    <p className="center">Sirens voice may make the opposing pitcher/batter miss.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Lucky</h3>
                    <img src="https://i.imgur.com/Mgx5muI.png" height="50px" title="This player gets all the breaks!"></img>
                    <p className="center">Lucky players are Luckier.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Unlucky</h3>
                    <img src="https://i.imgur.com/sTrsKvH.png" height="50px" title="This player just can't catch a break!"></img>
                    <p className="center">Unlucky players are Unluckier.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Lonely</h3>
                    <img src="https://i.imgur.com/vAuwVXq.png" height="50px" title="This player is lonely."></img>
                    <p className="center">Lonely players play better on larger teams.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Loner</h3>
                    <img src="https://i.imgur.com/6IXXrHo.png" height="50px" title="This player is a loner."></img>
                    <p className="center">Loner players play better on smaller teams.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Misunderstood</h3>
                    <img src="https://i.imgur.com/q30osFm.png" height="50px" title="This player is just misunderstood."></img>
                    <p className="center">If a ball would be thrown by a Misunderstood pitcher with no strikes in the count, they will throw a strike.
                    <br/>If a Misunderstood batter would hit a strike with no balls in the count, they will hit a ball.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Vampiric</h3>
                    <img src="https://i.imgur.com/Pn1UoAL.png" height="50px" title="This player is vampiric."></img>
                    <p className="center">Vampires may siphon stats off opposing players.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Team Pillar</h3>
                    <img src="https://i.imgur.com/GXCcMj0.png" height="50px" title="This player is a team pillar! They are immune!"></img>
                    <p className="center">This player is a pillar of their team.
                    <br/>This player is immune to most things.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Trader</h3>
                    <img src="https://i.imgur.com/qIl8Jji.png" height="50px" title="This player wants to trade!"></img>
                    <p className="center">This player has a chance to trade items with opposing players.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Precognition</h3>
                    <img src="https://i.imgur.com/xCk0rVZ.png" height="50px" title="This player can see a better future."></img>
                    <p className="center">This player can see the future!
                    <br/>This player can turn fouls into balls when there are two strikes in the count.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Gentleman</h3>
                    <img src="https://i.imgur.com/B93ztw2.png" height="50px" title="This player is a gentleman thief."></img>
                    <p className="center">This player is a gentleman thief.
                    <br/>When this player steals, they will take 0.5 runs from the opposing team.
                    <br/>This player will only take points on a proper steal.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Lightweight</h3>
                    <img src="https://i.imgur.com/uel3Avj.png" height="50px" title="This player likes to travel light."></img>
                    <p className="center">This player travels light.
                    <br/>This player plays better without an item.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Tertiary</h3>
                    <img src="https://i.imgur.com/FheImZD.png" height="50px" title="This player has an affinity for triples."></img>
                    <p className="center">This player hits triples more often.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Well Traveled</h3>
                    <img src="https://i.imgur.com/zCTp2Lx.png" height="50px" title="This player has a heart for adventure."></img>
                    <p className="center">This player plays better away.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Homebody</h3>
                    <img src="https://i.imgur.com/HeewHag.png" height="50px" title="This player prefers to be home."></img>
                    <p className="center">This player plays better at home.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Mindful</h3>
                    <img src="https://i.imgur.com/ZSlUnbk.png" height="50px" title="This player has a mind for others."></img>
                    <p className="center">This player can read minds.
                    <br/>This player has a chance to copy an opposing players mods.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Odd Scent</h3>
                    <img src="https://i.imgur.com/wN2akHp.png" height="50px" title="This player smells weird..."></img>
                    <p className="center">This player smells strange...
                    <br/>Opponents have a chance to lose 0.1 runs when this player hits a foul.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Unfamiliar</h3>
                    <img src="https://i.imgur.com/wrjCW4Y.png" height="50px" title="This player is not the one you remember."></img>
                    <p className="center">This player is not the one you remember.
                    <br/>This player will stay on base between innings.
                    <br/>This player will score negative if scoring for a team they are not on.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Threatening</h3>
                    <img src="https://i.imgur.com/F8CGcLH.png" height="50px" title="This player is dangerous to be around."></img>
                    <p className="center">This player will intentionally walk On Fire players.
                    <br/>This player may be intentionally walked.</p>
                </div>
            </div>

            <h3 className="center">Effect Mods</h3>
            <div className="mod-container">
                <div className='mod'>
                    <h3 className="center">Lost</h3>
                    <img src="https://i.imgur.com/2Vyez52.png" height="50px" title="This player is lost..."></img>
                    <p className="center">Lost players were lost in the shuffle and are not playing.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Found</h3>
                    <img src="https://i.imgur.com/FJ30bdi.png" height="50px" title="This player was found!"></img>
                    <p className="center">Found players were washed in.
                    <br/>When a player is found for the first time they will recieve a stat boost.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Heating Up</h3>
                    <img src="https://i.imgur.com/wWxWKyI.png" height="50px" title="This player is heating up..."></img>
                    <p className="center">This player is heating up.
                    <br/>This player will catch fire next game.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">On Fire</h3>
                    <img src="https://i.imgur.com/N1MvyL6.png" height="50px" title="This player is on fire!"></img>
                    <p className="center">Players on fire will get a hit next at bat.
                    <br/>This player will burn out after getting a hit.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Burnt Out</h3>
                    <img src="https://i.imgur.com/qmw52U7.png" height="50px" title="This player is burnt out..."></img>
                    <p className="center">Burnt Out players play worst for the rest of the game.
                    <br/>This player will start warming up next game.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Twink</h3>
                    <img src="https://i.imgur.com/yP1tgdG.png" height="50px" title="This player is Twink!"></img>
                    <p className="center">Twink players take 1 less strike to out.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Twunk</h3>
                    <img src="https://i.imgur.com/n9zYomn.png" height="50px" title="This player is Twunk!"></img>
                    <p className="center">Twunk players take 1 more ball to walk.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Twonk</h3>
                    <img src="https://i.imgur.com/wRqHRil.png" height="50px" title="This player is Twonk!"></img>
                    <p className="center">Twonk players give 2 outs.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Erased</h3>
                    <img src="https://i.imgur.com/4mvBVph.png" height="50px" title="This player is erased..."></img>
                    <p className="center">Erased players were deleted and can not play.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Data Leak</h3>
                    <img src="https://i.imgur.com/dLWhUNY.png" height="50px" title="This player is leaking data!"></img>
                    <p className="center">These players are leaking data!
                    <br/>Data leak may wear off, affecting the player in unexpected ways.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Data Breach</h3>
                    <img src="https://i.imgur.com/ROhdf21.png" height="50px" title="This player is leaking breaking!"></img>
                    <p className="center">Data Breach players seem content.
                    <br/>For now.
                    </p>
                </div>
                <div className='mod'>
                    <h3 className="center">Patched</h3>
                    <img src="https://i.imgur.com/ar8A2xZ.png" height="50px" title="This player has been patched."></img>
                    <p className="center">This player is all better now.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Wired</h3>
                    <img src="https://i.imgur.com/he4j9B0.png" height="50px" title="This player is wired!"></img>
                    <p className="center">Wired players scores count more.
                    <br/>Becomes Tired if hit by a coffee bean.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Tired</h3>
                    <img src="https://i.imgur.com/OFRRbPE.png" height="50px" title="This player is tired..."></img>
                    <p className="center">Tired players scores count less.
                    <br/>Removed if hit by a coffee bean.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Welled</h3>
                    <img src="https://i.imgur.com/DqqNyTQ.png" height="50px" title="This player is stuck in a well and unable to play."></img>
                    <p className="center">This player is stuck in a well and unable to play.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Scattered</h3>
                    <img src="https://i.imgur.com/f1pN5ns.png" height="50px" title="This player is dust in the wind."></img>
                    <p className="center">This player is blowing in the wind.
                    <br/>This player may move to another team.</p>
                </div>
            </div>

            <h3 className="center">Seasonal Mods</h3>
            <div className="mod-container">
                <div className='mod'>
                    <h3 className="center">Crown</h3>
                    <img src="https://i.imgur.com/ObKxsXM.png" height="50px" title="This player is having a great season."></img>
                    <p className="center">The Crown is given to a player for a seaon when their team draws The Crown.
                    <br/>Players with the crown generally play better.</p>
                </div>
                <div className='mod'>
                    <h3 className="center">Hierophant</h3>
                    <img src="https://i.imgur.com/rfIZ636.png" height="50px" title="This player is checking the stars."></img>
                    <p className="center">The Hierophant is given to a player for a seaon when their team draws The Hierophant.
                    <br/>Hierophant batters add or subtract balls and strikes needed from the count when they step up to bat.
                    <br/>Hierophant pitchers add or subtract balls and strikes needed from the count when they face a new batter.</p>
                </div>
            </div>

            <h3 className="center">One-off Mods</h3>
            <div className="mod-container">
                <div className='mod'>
                    <h3 className="center">Minimized</h3>
                    <img src="https://i.imgur.com/ZAxrqiz.png" height="50px" title="This player was minimized to zero."></img>
                    <p className="center">When a player is minimized their stats will all drop to zero.</p>
                </div>
            </div>
        </div>
    )
}

export default Mods