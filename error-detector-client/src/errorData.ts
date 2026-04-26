import {
  Target,
  Scissors,
  Eye,
  Scale,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import type { CategoryId } from './types';

// ── Category metadata ──────────────────────────────────────────────────────────

export interface CategoryMeta {
  label: string;
  bgColor: string;
  accentColor: string;
  Icon: LucideIcon;
}

export const categoryMeta: Record<CategoryId, CategoryMeta> = {
  accuracy: {
    label: 'Accuracy',
    bgColor: '#ffff66',
    accentColor: '#b8a800',
    Icon: Target,
  },
  brevity: {
    label: 'Brevity',
    bgColor: '#ffb366',
    accentColor: '#cc6600',
    Icon: Scissors,
  },
  clarity: {
    label: 'Clarity',
    bgColor: '#c0e769',
    accentColor: '#5a9900',
    Icon: Eye,
  },
  objectivity: {
    label: 'Objectivity',
    bgColor: '#69e4e7',
    accentColor: '#007a80',
    Icon: Scale,
  },
  formality: {
    label: 'Formality',
    bgColor: '#B19CD9',
    accentColor: '#6040b0',
    Icon: BookOpen,
  },
};

// ── Error data ─────────────────────────────────────────────────────────────────

export interface ErrorPattern {
  regex: string;
  help: string;
  video?: string;
}

export interface ErrorSubclass {
  title: string;
  video?: string;
  errors?: ErrorPattern[];
}

export type ErrorDict = Record<CategoryId, Record<string, ErrorSubclass>>;

export const errorDict: ErrorDict = {
  accuracy: {
    A1: {
      title: 'Factual errors',
      video: '',
    },
    A2: {
      title: 'Overgeneralization errors',
      video: '01y0uHPLOSE',
      errors: [
        { regex: '', help: '', video: '' },
      ],
    },
    A3: {
      title: 'Overly bold claims',
      video: '',
      errors: [
        { regex: '', help: '', video: '' },
      ],
    },
    A4: {
      title: 'Numerical or statistical errors',
      video: '',
      errors: [
        { regex: '', help: '', video: '' },
      ],
    },
    A5: {
      title: 'Numerous grammatical, lexical and spelling errors',
      video: '',
      errors: [
        {
          regex: 'researches|researchs',
          help: "The noun 'researches' is very marked (unnatural). Use the uncountable noun 'research' or change the word to 'studies'.",
          video: 'p2HpNMJQrKk',
        },
        {
          regex: 'one of the|each of the',
          help: 'Check that this phrase is followed by a plural noun.',
          video: 'MYNHF7UiOdQ',
        },
        {
          regex: 'a\\s+hour',
          help: "The first sound in 'hour' is a vowel sound and so use the article 'an' not 'a'.",
          video: '',
        },
        {
          regex: '(accommodation|clothing|furniture|homework|information|knowledge|lightning|luggage|music|public|slang|training|transportation)s',
          help: "This is almost always used as an uncountable noun, so consider deleting the 's' at the end and check the agreement with the rest of the sentence.",
          video: 'Wgp2ewKjkp0',
        },
        {
          regex: '(are|be|is|was|were) (happened|occurred)',
          help: 'This is an intransitive verb and so cannot be used in passive voice.',
          video: '5SoaSL_wNx4',
        },
        {
          regex: 'averagely',
          help: "Replace 'averagely' with 'on average'.",
          video: '',
        },
        {
          regex: 'that, if',
          help: 'Delete the misplaced comma.',
          video: '',
        },
        {
          regex: 'between\\W+(?:\\w+\\W+){1,2}?to',
          help: "In formal writing use 'between...and...'.",
          video: '',
        },
        {
          regex: 'more +\\w*er',
          help: "Comparative adjectives use either 'more' or the suffix '...er' but not both.",
          video: '',
        },
        {
          regex: 'another +\\w*s',
          help: "The determiner 'another' should be followed by a singular noun, not a plural noun.",
          video: '',
        },
        {
          regex: 'a [aeiou]\\w+',
          help: "Singular nouns that begin with a vowel sound are preceded by 'an', not 'a'. Check this instance is correct.",
          video: '',
        },
        {
          regex: 'works',
          help: "The plural noun 'works' is very marked (unnatural). Use the uncountable noun 'work' unless referring to works of art or roadworks.",
          video: '',
        },
        {
          regex: 'moreover',
          help: "The adverb 'moreover' is used to introduce information in support of a previous point. Check that this is the intended usage as this word is frequently misused.",
          video: '',
        },
        {
          regex: '(despite)\\W+(?:\\w+\\W+){1,3}?(is|are|was|were)',
          help: "The preposition 'despite' should be followed by a noun phrase, not a clause.",
          video: 'LQ_yaNQz9Ao',
        },
        {
          regex: '(in spite of)\\W+(?:\\w+\\W+){1,3}?(is|are|was|were)',
          help: "The preposition 'in spite of' should be followed by a noun phrase, not a clause.",
          video: 'LQ_yaNQz9Ao',
        },
        {
          regex: '[,] although',
          help: "A comma is not usually used before 'although' and so check there is sufficient reason for it.",
          video: '',
        },
        {
          regex: 'independent mutually',
          help: "The adverb 'mutually' is commonly placed before the adjective 'independent'.",
          video: '',
        },
        {
          regex: '(can|could|may|might|must|shall|should)(?=\\s\\w+(ed))',
          help: 'The verb following a modal verb cannot take a past tense form. Use present tense, instead.',
          video: '',
        },
        {
          regex: 'There (happened|occurred)',
          help: "This verb is intransitive and cannot be followed by an object. Use either 'There was' to start the sentence or replace 'There'.",
          video: 'K8YRCQvpZEg',
        },
        {
          regex: 'I analysis',
          help: "Replace the noun 'analysis' with the verb 'analyzed' or 'analyze'.",
          video: '',
        },
        {
          regex: 'I am belong',
          help: "Delete 'am' as 'belong' is a verb.",
          video: '',
        },
        {
          regex: 'It requires also',
          help: "The adverb 'also' is frequently used just before main verbs apart from the verb 'be'.",
          video: '',
        },
        {
          regex: 'much +\\w*s',
          help: "Check that there is an uncountable noun. If there is a plural noun, replace with 'many'.",
          video: '',
        },
        {
          regex: 'many +\\w*([a-r]|[t-z]+)',
          help: "Check that there is a plural noun. If not, consider replacing with 'much'.",
          video: '',
        },
        {
          regex: 'datas',
          help: "Either use 'data' as the plural noun or 'data sets' if referring to different groups of data.",
          video: '',
        },
        {
          regex: 'They analysis',
          help: "Replace the noun 'analysis' with the verb 'analyzed' or 'analyze'.",
          video: '',
        },
        {
          regex: 'We analysis',
          help: "Replace the noun 'analysis' with the verb 'analyzed' or 'analyze'.",
          video: '',
        },
        {
          regex: 'locates near',
          help: "Replace with passive voice 'is located near'.",
          video: '',
        },
        {
          regex: 'each data',
          help: "Check this is followed by either 'set' or 'point'.",
          video: '9Lpmc3kcm44',
        },
        {
          regex: 'two data',
          help: "Check this is followed by either 'sets' or 'points'.",
          video: '9Lpmc3kcm44',
        },
        {
          regex: 'was did',
          help: "If this is passive voice, use 'was done'.",
          video: '',
        },
        {
          regex: 'can to',
          help: "The modal verb 'can' is usually followed by a verb in present tense.",
          video: '',
        },
        {
          regex: 'I am belonging',
          help: "Replace with 'I belong' as this is a stative verb that avoids the -ing form.",
          video: '',
        },
        {
          regex: 'payed',
          help: "This past tense form is possible, but rarely used. Replace with 'paid'.",
          video: '',
        },
        {
          regex: 'each +\\w*s',
          help: "Check that the determiner 'each' is followed by a singular noun.",
          video: '',
        },
        {
          regex: 'randam',
          help: "Most probably this should be 'random'.",
          video: 'NHp3FYp6ihk',
        },
        {
          regex: 'mesured',
          help: "Most probably this should be 'measured'. Use a spellchecker!",
          video: 'NHp3FYp6ihk',
        },
        {
          regex: 'seve',
          help: "Most probably this should be 'save'. Use a spellchecker!",
          video: 'NHp3FYp6ihk',
        },
        {
          regex: 'as follow',
          help: "Replace with 'as follows'.",
          video: 'tMiKcXEpDTE',
        },
        {
          regex: 'Also',
          help: "We avoid using 'Also' at the beginning of a sentence. If the main verb is 'be', place 'also' immediately after it, e.g. 'This is also a problem'. If not, place 'also' immediately before it, e.g. 'This can also help'.",
          video: '',
        },
        {
          regex: 'every +\\w*s',
          help: "Check that the noun following 'every' is singular.",
          video: '',
        },
        {
          regex: 'has following',
          help: "Replace with 'has the following'.",
          video: '',
        },
        {
          regex: 'dicide',
          help: "Most probably this should be 'decide'. Use a spellchecker!",
          video: 'NHp3FYp6ihk',
        },
        {
          regex: 'discusstion',
          help: "This should be 'discussion'. Use a spellchecker!",
          video: 'NHp3FYp6ihk',
        },
        {
          regex: 'english',
          help: "This word starts with a capital letter: 'English'.",
          video: '',
        },
        {
          regex: 'Engrish',
          help: "This word uses the letter: 'l'.",
          video: '7uvWj6lUHTE',
        },
        {
          regex: 'libraly',
          help: "This word is spelt: 'library'.",
          video: '7uvWj6lUHTE',
        },
        {
          regex: 'almost Japanese',
          help: "If you mean nearly all Japanese, replace with 'almost all Japanese'.",
          video: '',
        },
        {
          regex: 'it have',
          help: "The subject and verb do not agree (unless this is a question). Replace with 'it has'.",
          video: '',
        },
        {
          regex: 'two main way',
          help: "Plural numbers should be followed by plural nouns. Replace with 'two main ways'.",
          video: '',
        },
        {
          regex: 'envrionment',
          help: "This should be 'environment'. Use a spellchecker!",
          video: 'NHp3FYp6ihk',
        },
        {
          regex: 'Reference',
          help: "Assuming this is a section heading, and if there is only one reference, this is correct. If not, use the plural 'References'.",
          video: '',
        },
      ],
    },
  },

  brevity: {
    B1: {
      title: 'Multiple vague words',
      video: '0-agNnDeA1M',
      errors: [
        {
          regex: 'and so on',
          help: "Consider replacing 'X, Y and so on' with 'such as X and Y'.",
          video: '',
        },
        {
          regex: 'and so forth',
          help: "Consider replacing 'X, Y and so forth' with 'such as X and Y'.",
          video: '',
        },
        {
          regex: 'etc',
          help: "Consider replacing 'X and Y, etc.' with 'such as X and Y'.",
          video: '',
        },
      ],
    },
    B2: {
      title: 'Repetition',
      video: '8QViQ4HhWbc',
      errors: [
        {
          regex: 'day by day',
          help: "Replace with 'daily' and save two words.",
          video: '',
        },
        {
          regex: 'little by little',
          help: "Replace with 'gradually' and save two words.",
          video: '',
        },
        {
          regex: 'step by step',
          help: "Replace with 'incrementally' and save two words.",
          video: '',
        },
      ],
    },
    B3: {
      title: 'Redundancy',
      video: '',
      errors: [
        {
          regex: 'I think',
          help: 'This phrase is redundant. Delete and save two words.',
          video: 'O7niRNda5OY',
        },
        {
          regex: 'I do not think',
          help: "Delete 'I do not think' and add 'not' to the following clause.",
          video: 'O7niRNda5OY',
        },
        {
          regex: 'see\\W+(?:\\w+\\W+){1,4}?with your eyes',
          help: "Delete 'with your eyes' as it is obvious, and check whether a verb like 'notice' is more suitable.",
          video: '',
        },
        {
          regex: 'each and every',
          help: "Delete 'and every'.",
          video: '77Xxxw_SqFM',
        },
        {
          regex: 'general public',
          help: "Delete 'general'.",
          video: '',
        },
        {
          regex: 'join together',
          help: "Delete 'together'.",
          video: '',
        },
        {
          regex: 'due to the fact that',
          help: "Replace with 'because' to save four words.",
          video: '',
        },
        {
          regex: 'whether or not',
          help: "Delete 'or not' to save two words.",
          video: '',
        },
        {
          regex: 'comprise of',
          help: "Delete the preposition 'of'.",
          video: '',
        },
        {
          regex: 'all of the',
          help: "Delete the preposition 'of'.",
          video: '',
        },
        {
          regex: 'his or her',
          help: "Where possible use the plural form 'they' and change the grammar accordingly.",
          video: '',
        },
        {
          regex: 'discuss about',
          help: "In formal English, the preposition 'about' is usually avoided.",
          video: 'utbwaTvSMY0',
        },
      ],
    },
  },

  clarity: {
    C1: {
      title: 'Vague terms',
      video: '',
      errors: [
        {
          regex: '\\s(thing)',
          help: "Replace with a more specific word, such as 'concept, item or idea'.",
          video: 'ujZH_xug8ys',
        },
        {
          regex: '(something)',
          help: "Replace with a more specific word, such as 'concept, item or idea'.",
          video: 'W9zemBY_6Bc',
        },
        {
          regex: '(things)',
          help: "Replace with a more specific word, such as 'concepts, items or ideas'.",
          video: 'ujZH_xug8ys',
        },
        {
          regex: '(really)',
          help: "The adverb 'really' is ambiguous and informal. Use either 'extremely' or 'particularly' to intensify an adjective, or use 'actually' to focus on an actual situation.",
          video: 'TmIHHyI-HK4',
        },
        {
          regex: '(etc|etcetera)',
          help: "Consider deleting or using 'for example' or 'for instance' at the beginning of the list.",
          video: '',
        },
        {
          regex: '(somebody|someone)',
          help: "Use a more specific word appropriate in this context, such as 'users', 'students' or 'researchers'.",
          video: 'W9zemBY_6Bc',
        },
        {
          regex: '(some researchers)',
          help: 'Cite specific researchers where possible.',
          video: 'omQhT7yLtv8',
        },
        {
          regex: '(researchers say)',
          help: 'State the surnames of the researchers or provide a reference to increase clarity.',
          video: '',
        },
        {
          regex: '(it is said)',
          help: 'State the surnames of the researchers or provide a reference to increase clarity.',
          video: '',
        },
        {
          regex: '(very long time)',
          help: 'Rather than referring to a vague period of time, be specific if possible.',
          video: '',
        },
      ],
    },
    C2: {
      title: 'Ambiguous terms',
      video: '',
      errors: [
        {
          regex: '(good|bad|nice)',
          help: 'Words like good, bad and nice are ambiguous. Replace with a more specific word or define this adjective.',
          video: 'd87L5-EP49E',
        },
        {
          regex: '(get|got|gotten)',
          help: "Replace with a more specific word, such as 'obtain, receive or award'.",
          video: 'oSfHF8FBkxg',
        },
      ],
    },
    C3: {
      title: 'Ambiguous references',
      video: '',
      errors: [
        {
          regex: '\\s(he|she|they|them)\\s',
          help: 'Pronouns may be ambiguous. If possible, rephrase to avoid the need for personal pronouns or replace the pronoun with a more specific noun.',
          video: '0ufo-3cPBm0',
        },
        {
          regex: '\\s(it)\\s',
          help: 'Pronouns may be ambiguous. If possible, rephrase to avoid the need for personal pronouns or replace the pronoun with a more specific noun.',
          video: 'pZxvDb2BeO4',
        },
      ],
    },
    C4: {
      title: 'Ambiguous syntax',
      video: '',
    },
    C5: {
      title: 'Garden-path sentences',
      video: '',
    },
  },

  objectivity: {
    O1: {
      title: 'Feeling/People focus',
      video: '',
    },
    O2: {
      title: 'Emotive',
      video: 'Sa1SF5URWCw',
      errors: [
        {
          regex: '(clearly|obviously)',
          help: 'This adverb is subjective, and so it is likely others do not share the same view. Consider rephrasing.',
          video: '',
        },
        {
          regex: '(excellent|perfect|fabulous|fantastic|outstanding|incredible)',
          help: 'This adjective is subjective and unclear. Replace with a more precise term.',
          video: 'aIT_4ldge9Q',
        },
        {
          regex: '(unfortunately|amazing|disappointed|excited|pleased)',
          help: 'To increase the perception of objectivity avoid emotive terms. Focus on the research not feelings.',
          video: 'XJ2aQJHZjds',
        },
        {
          regex: '(at last|eventually)',
          help: 'To increase the perception of objectivity avoid emotive terms.',
          video: '',
        },
      ],
    },
    O3: {
      title: 'Excessive personalisation',
      video: 'Mqxad-dsbvw',
      errors: [
        {
          regex: '\\s(you|your|yours|yourself)\\s',
          help: "Avoid using 'you', 'your', 'yours' or 'yourself' in scientific writing. These terms are both unclear and personal.",
          video: 'Mqxad-dsbvw',
        },
      ],
    },
  },

  formality: {
    F1: {
      title: 'Punctuation issues',
      video: 'vjaPFKo7Igo',
      errors: [
        { regex: "(it's)",      help: "Apostrophes to indicate the omission of a letter or letters are rather informal. Use the full form.", video: 'vjaPFKo7Igo' },
        { regex: "(that's)",    help: "Apostrophes to indicate the omission of a letter or letters are rather informal. Use the full form.", video: 'vjaPFKo7Igo' },
        { regex: "(couldn't)",  help: "Apostrophes to indicate the omission of a letter or letters are rather informal. Use the full form.", video: 'vjaPFKo7Igo' },
        { regex: "(can't)",     help: "Apostrophes to indicate the omission of a letter or letters are rather informal. Use the full form.", video: 'vjaPFKo7Igo' },
        { regex: "(we're)",     help: "Apostrophes to indicate the omission of a letter or letters are rather informal. Use the full form.", video: 'vjaPFKo7Igo' },
        { regex: "(don't)",     help: "Apostrophes to indicate the omission of a letter or letters are rather informal. Use the full form.", video: 'vjaPFKo7Igo' },
        { regex: "(didn't)",    help: "Apostrophes to indicate the omission of a letter or letters are rather informal. Use the full form.", video: 'vjaPFKo7Igo' },
        { regex: "(doesn't)",   help: "Apostrophes to indicate the omission of a letter or letters are rather informal. Use the full form.", video: 'vjaPFKo7Igo' },
        { regex: "(haven't)",   help: "Apostrophes to indicate the omission of a letter or letters are rather informal. Use the full form.", video: 'vjaPFKo7Igo' },
        { regex: "(hasn't)",    help: "Apostrophes to indicate the omission of a letter or letters are rather informal. Use the full form.", video: 'vjaPFKo7Igo' },
        { regex: "(hadn't)",    help: "Apostrophes to indicate the omission of a letter or letters are rather informal. Use the full form.", video: 'vjaPFKo7Igo' },
        { regex: "(you're)",    help: "Apostrophes to indicate the omission of a letter or letters are rather informal. Use the full form.", video: 'vjaPFKo7Igo' },
      ],
    },
    F2: {
      title: 'Abbreviation issues',
      video: 'QdH6UKLzpkw',
    },
    F3: {
      title: 'Slang',
      video: 'ouUbbT3vjMQ',
      errors: [
        {
          regex: '(kicked out)',
          help: "Phrasal verbs tend to be rather informal. Replace with a more formal verb, such as 'ejected'.",
          video: '',
        },
        {
          regex: '(found out)',
          help: "Phrasal verbs tend to be rather informal. Replace with a more formal verb, such as 'discovered'.",
          video: '',
        },
        {
          regex: '(ASAP)',
          help: 'Use the full form.',
          video: '',
        },
        {
          regex: '(find out)',
          help: "Phrasal verbs tend to be rather informal. Replace with a more formal verb, such as 'discover'.",
          video: '',
        },
      ],
    },
    F4: {
      title: 'Informal quantifiers, adverbs, format and linking',
      video: '',
      errors: [
        {
          regex: '(have not been +\\w* yet)',
          help: "This is slightly informal. Replace with 'have not yet been ...'.",
          video: '',
        },
        {
          regex: '(`\\w+)',
          help: "Replace the Japanese apostrophe with a Western one '.",
          video: '',
        },
        {
          regex: '(lots of)',
          help: "' lots of' is rather informal. Use either 'much' before uncountable nouns or 'many' before plural nouns.",
          video: '',
        },
        {
          regex: '(a lot of)',
          help: "'a lot of' is rather informal. Consider using 'a large number of' with plural nouns or 'a large amount of' with uncountable nouns.",
          video: '',
        },
        {
          regex: '(right) after',
          help: "'right' is quite informal. Replace with 'immediately'.",
          video: '',
        },
        {
          regex: '(right) before',
          help: "'right' is quite informal. Replace with 'immediately'.",
          video: '',
        },
        {
          regex: '(straight) after',
          help: "'straight' is quite informal. Replace with 'immediately'.",
          video: '',
        },
        {
          regex: '(straight) before',
          help: "'straight' is quite informal. Replace with 'immediately'.",
          video: '',
        },
        {
          regex: '(And)',
          help: "Although it is grammatically correct, a number of supervisors, reviewers and editors may view it negatively. Consider using 'In addition,' instead.",
          video: '4VxmGrHdkbo',
        },
        {
          regex: '(So(,)?)\\s',
          help: "Although it is grammatically correct, a number of supervisors, reviewers and editors may view it negatively. Consider using 'Therefore,' instead.",
          video: '4VxmGrHdkbo',
        },
        {
          regex: '(But)\\s',
          help: "Although it is grammatically correct, a number of supervisors, reviewers and editors may view it negatively. Consider using 'However,' instead.",
          video: '4VxmGrHdkbo',
        },
        {
          regex: '(plenty of)',
          help: "'plenty of' is informal. Replace with 'much' before uncountable nouns or 'many' before plural nouns.",
          video: 'k1ZiCsoaIDc',
        },
        {
          regex: '(has not been +\\w* yet)',
          help: "This is slightly informal. Replace with 'has not yet been ...'.",
          video: '',
        },
        {
          regex: '(little bit)',
          help: "When used before a noun, replace with the more formal adjective 'minor'. When used before an adjective, delete 'bit'.",
          video: '',
        },
        {
          regex: '(That is why)',
          help: "This phrase is rather informal. Replace with a more formal phrase such as 'For this reason,'.",
          video: '',
        },
        {
          regex: '(often)',
          help: "'often' is quite informal. Consider replacing with 'frequently'.",
          video: '',
        },
        {
          regex: '(sometimes)',
          help: "'sometimes' is quite informal. Consider replacing with 'occasionally'.",
          video: '',
        },
      ],
    },
    F5: {
      title: 'Rhetorical questions',
      video: 'JwFXB0JV8Qc',
    },
    F6: {
      title: 'Phrasal verbs',
      video: 'Y7NyWYXc8Ug',
      errors: [
        {
          regex: '(happen)',
          help: "'happen' is slightly informal. Replace with 'occur'.",
          video: '',
        },
      ],
    },
  },
};
