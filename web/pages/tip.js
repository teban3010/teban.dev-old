import React from 'react';
import Link from 'next/link';

import SEO from 'components/Seo';
import { getSortedTips } from 'utils/tip';

import { Typography, Box, Link as MuiLink } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  article: {
    marginBottom: 20,
  },
  title: {
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  link: {
    boxShadow: `none`,
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      cursor: 'pointer',
    },
  },
  description: {
    color: theme.palette.text.secondary,
  },
}));

const Tip = ({ tip }) => {
  const classes = useStyles();

  return (
    <>
      <SEO title="All tips" />
      {tip.map(({ frontmatter: { title, description, date }, slug }) => (
        <Box component="article" key={slug} className={classes.article}>
          <header>
            <Link href={'/tip/[slug]'} as={`/tip/${slug}`}>
              <Typography variant="h3" className={classes.title}>
                <MuiLink className={classes.link}>{title}</MuiLink>
              </Typography>
            </Link>
            <Typography variant="caption">{date}</Typography>
          </header>
          <section>
            <Typography variant="subtitle2" className={classes.description}>
              {description}
            </Typography>
          </section>
        </Box>
      ))}
    </>
  );
};

export default Tip;

export const getStaticProps = () => ({
  props: {
    tip: getSortedTips(),
  },
});
