"""
SQLAlchemy uses the term "model" to refer to these classes and 
instances that interact with the database. In this module we then
define the SQLAlchemy models. 

But Pydantic also uses the term "model" to refer to something different,
the data validation, conversion, and documentation classes and instances.

Links:
    https://fastapi.tiangolo.com/tutorial/sql-databases/#create-the-database-models
    https://docs.sqlalchemy.org/en/14/faq/metadata_schema.html 
"""

from datetime import date

from sqlalchemy import (
    Boolean,
    Column,
    ForeignKey,
    Integer,
    String,
    Date,
    CheckConstraint,
    Table,
)
from sqlalchemy.orm import relationship
from database import Base, SessionLocal

# Import Base from database (the file database.py from above).
# Create classes that inherit from it.
# These classes are the SQLAlchemy models.
# Now create all the model (class) attributes.
# Each of these attributes represents a column in its corresponding
# database table. We use Column from SQLAlchemy as the default value.
# Many-to-many relationship between Tournament and Player
# https://docs.sqlalchemy.org/en/14/orm/basic_relationships.html#many-to-many

linking_table = Table(
    "linking",
    Base.metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("tournament_id", Integer, ForeignKey("Tournament.id")),
    Column("player_id", Integer, ForeignKey("Player.id"))
)

class Tournament(Base):
    __tablename__ = 'Tournament'
    __table_args__ = (
        CheckConstraint('end_date >= start_date', name='check_dates'),
    )

    id          = Column(Integer, primary_key=True, autoincrement=False)
    name        = Column(String, nullable=False, unique=True)
    start_date  = Column(Date, nullable=False)
    end_date    = Column(Date, nullable=False)

    players_enrolled = relationship("Player", back_populates="tournament", secondary=linking_table)
#:
#From sensei: players_enrolled = relationship("Player", back_populates="tournament")
# Tournament.players = relationship("Player", order_by=Player.id, back_populates="tournament")

class Player(Base):  # type: ignore  (Pylance )
    __tablename__ = 'Player'

    id              = Column(Integer, primary_key=True, index=True, autoincrement="auto")
    full_name       = Column(String, nullable=False)
    email           = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    phone_number    = Column(String(13))
    # birth_date      = Column(Date, nullable=False)
    level           = Column(String(30), nullable=False)
    is_active       = Column(Boolean, default=True)

    tournament      = relationship("Tournament", back_populates="players_enrolled", secondary=linking_table)

    # https://docs.sqlalchemy.org/en/13/orm/extensions/declarative/table_config.html
#:
#from sensei: tournament      = relationship("Tournament", back_populates="players_enrolled")

def populate_db():
    # db_session = SessionLocal()
    with SessionLocal() as db_session:
        # The above Session is associated with our SQLite-enabled Engine,
        # but it hasn’t opened any connections yet. When it’s first used,
        # it retrieves a connection from a pool of connections maintained
        # by the Engine, and holds onto it until we commit all changes
        # and/or close the session object.
        player1 = Player(
            full_name = 'Armando Alves',
            email = 'arm@mail.com',
            hashed_password = 'abc-hashedpw',
            phone_number = '+351922781977',
            level = 'beginner',
        )
        player2 = Player(
            full_name = 'Augusto Avelar',
            email = 'aug@mail.com',
            hashed_password = 'abc-hashedpw',
            phone_number = '+351922781977',
            level = 'beginner',
        )
        tournament1 = Tournament(
            id         = 1,
            name      = 'Torneio da Páscoa',
            start_date = date(2023, 4, 17),
            end_date   = date(2023, 4, 25),
        )
        tournament2 = Tournament(
            id         = 2,
            name      = 'Torneio da Amizade',
            start_date = date(2023, 5, 17),
            end_date   = date(2023, 5, 25),
        )
        tournament3 = Tournament(
            id         = 3,
            name      = 'Torneio da Primavera',
            start_date = date(2023, 6, 17),
            end_date   = date(2023, 6, 25),
        )
        db_session.add_all([player1, player2, tournament1, tournament2, tournament3])
        player1.tournament.append(tournament1)
        player1.tournament.append(tournament2)
        player1.tournament.append(tournament3)
        # At this point, we say that the instance is pending; no SQL has
        # yet been issued and the object is not yet represented by a row
        # in the database. The Session will issue the SQL to persist Ed
        # Jones as soon as is needed, using a process known as a flush.
        # If we query the database for Ed Jones, all pending information
        # will first be flushed, and the query is issued immediately
        # thereafter.
        # https://docs.sqlalchemy.org/en/14/orm/session_state_management.html#session-object-states

        # The Session is paying attention. It knows, for example, that
        # 'Armando Alvarez' has been modified.
        # At the REPL we can try 
        #       >>> db_session.dirty
        #       >>> db_session.new
        db_session.commit()
        # commit the changes to the database (so that they are saved).
        # the objects are flushed to the DB.
    #:
#:
# https://docs.sqlalchemy.org/en/14/core/metadata.html#sqlalchemy.schema.Column
